const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
  context.log("Function started");

  try {
    context.log("Endpoint:", process.env.COSMOS_ENDPOINT ? "OK" : "MISSING");
    context.log("Key:", process.env.COSMOS_KEY ? "OK" : "MISSING");

    const client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY
    });

    context.log("Client created");

    const container = client.database("resume").container("counter");

    const response = await container.item("visits", "visits").read();

    context.log("Item read:", response.resource);

    response.resource.count += 1;

    await container.item("visits", "visits").replace(response.resource);

    context.res = {
      status: 200,
      body: { count: response.resource.count }
    };

  } catch (err) {
    context.log.error("ERROR STACK:", err);
    context.res = {
      status: 500,
      body: err.stack || err.message
    };
  }
};
