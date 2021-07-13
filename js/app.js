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

  hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("open");
  });
}

// this function is for our works sliding
function cardsCarousel() {
  const slide = document.querySelectorAll(".circle");
  const transform = document.querySelectorAll(".card");

  let index = 1;
  let previousIndex = 1;

  slide.forEach(function (circle) {
    circle.addEventListener("click", function (e) {
      slide.forEach(function (circle) {
        if (circle.classList.contains("circle--active")) {
          previousIndex = circle.dataset.index;
        }
        circle.classList.remove("circle--active");
      });

      e.target.classList.add("circle--active");
      index = e.target.dataset.index;

      if (previousIndex <= index) {
        transform.forEach(function (card) {
          card.style.transform = `translateX(${-115 * index}%)`;
        });
      } else {
        transform.forEach(function (card) {
          console.log("nope");
          if (index == 0) {
            card.style.transform = `translateX(0%)`;
          }
          if (index == 1) {
            card.style.transform = `translateX(0%)`;
            card.style.transform = `translateX(-115%)`;
          }
        });
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
  themeButton();
  cardsCarousel();
});
