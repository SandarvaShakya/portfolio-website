// Grabbing constants
const slider = document.querySelector("input");
let theme = document.documentElement.dataset;
let themeSelect = document.querySelector(".switch input");

// function to change theme and save it to local storage
function themeButton() {
  slider.addEventListener("change", function (e) {
    if (this.checked) {
      theme.theme = "dark";
      localStorage.setItem("checked", true);
    } else {
      theme.theme = "light";
      localStorage.setItem("checked", false);
    }
    localStorage.setItem("theme", theme.theme);
  });
}

// function to toggle sidebar
function sidebarToggle() {
  const hamburger = document.querySelector("#hamburger");
  const sidebar = document.querySelector(".sidebar");
  const links = document.querySelectorAll(".nav__link");

  hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      sidebar.classList.remove("open");
    });
  });
}

// works are scrolled natively; the dots follow and jump to the scroll position
function cardsCarousel() {
  const container = document.querySelector(".card-container");
  const cards = container.querySelectorAll(".card");
  const dots = document.querySelectorAll(".circle");

  const setActive = (i) =>
    dots.forEach((d) => d.classList.toggle("circle--active", d.dataset.index == i));

  dots.forEach((dot) =>
    dot.addEventListener("click", () => {
      container.scrollLeft = cards[dot.dataset.index].offsetLeft - cards[0].offsetLeft;
    })
  );

  container.addEventListener("scroll", () => {
    const max = container.scrollWidth - container.clientWidth;
    // dots only cover scroll positions, so map progress onto them
    setActive(Math.round((container.scrollLeft / max) * (dots.length - 1)));
  });
}

//makes links active according to location
function navActive() {
  const sections = document.querySelectorAll(".section");
  const icons = document.querySelectorAll(".nav__link i");

  window.addEventListener("scroll", function (e) {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    icons.forEach(function (icon) {
      icon.classList.remove("active");
      if (icon.dataset.icon === currentSection) {
        icon.classList.add("active");
      }
    });
  });
}

//makes heading animation according to active section
function transformHeading() {
  const sections = document.querySelectorAll(".section");
  const heading = document.querySelectorAll(".section__heading");

  window.addEventListener("scroll", function () {
    let currentSection = "";

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 2) {
        currentSection = section.getAttribute("id");
      }
    });

    heading.forEach(function (head) {
      head.style.transform = `translateX(-100vw)`;
      if (head.dataset.heading === currentSection) {
        head.style.transform = `translateX(0%)`;
      }
    });
  });
}

//calls all other functions after DOM content loads
//also checks for any localstorage data and implements the theme
window.addEventListener("DOMContentLoaded", function () {
  let storageTheme = localStorage.getItem("theme");
  let switchState = JSON.parse(localStorage.getItem("checked"));
  if (storageTheme && switchState) {
    theme.theme = storageTheme;
    themeSelect.setAttribute("checked", switchState);
  } else {
    localStorage.setItem("theme", theme.theme);
    localStorage.setItem("checked", false);
  }

  sidebarToggle();
  navActive();
  transformHeading();
  themeButton();
  cardsCarousel();
});
