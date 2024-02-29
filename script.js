// to top button

const up = document.querySelector(".boutton-up");

window.addEventListener("scroll", (event) => {
  if (window.scrollY > 300) {
    up.classList.add("show");
  } else {
    up.classList.remove("show");
  }
});

up.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

// Menu burger

const menuBurger = document.querySelector(".menu-burger");
const navLinks = document.querySelector(".nav-links");

menuBurger.addEventListener("click", function () {
  navLinks.classList.toggle("mobile-menu");
});
