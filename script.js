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
