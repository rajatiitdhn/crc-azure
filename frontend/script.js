/* VISITOR COUNTER */
fetch("https://rajat-cloud-resume-func-etdaa3debbexcgak.centralindia-01.azurewebsites.net/api/visitcount")
  .then(res => res.json())
  .then(data => counter.innerText = data.count)
  .catch(() => counter.innerText = "0");

/* TYPING EFFECT */
const text = "Rajat";
let i = 0;
const typing = document.getElementById("typing");

function type() {
  if (i < text.length) {
    typing.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 120);
  }
}
type();

/* DARK ↔ LIGHT TOGGLE */
const toggle = document.getElementById("themeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
  toggle.textContent =
    document.body.classList.contains("dark") ? "🌙" : "☀️";
};

/* NAVBAR BACKGROUND ON SCROLL */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/* ACTIVE NAV LINK (SCROLL + CLICK) */
const sections = document.querySelectorAll("section, footer");
const navLinks = document.querySelectorAll(".nav-link");

let isScrollingByClick = false;

function setActiveLink(id) {
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", () => {
  if (isScrollingByClick) return;

  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) {
      current = section.id;
    }
  });

  if (current) setActiveLink(current);
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").substring(1);

    isScrollingByClick = true;
    setActiveLink(targetId);

    setTimeout(() => {
      isScrollingByClick = false;
    }, 600);
  });
});
