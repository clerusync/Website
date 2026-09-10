'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

/**
 * image viewer
 */

  const imageViewer = document.getElementById("imageViewer");
  const imageViewerImage = document.getElementById("imageViewerImage");
  const imageViewerClose = document.getElementById("imageViewerClose");
 
  const destinationImages = document.querySelectorAll(
    ".destinations-card .card-img img"
  );
 
  destinationImages.forEach((image) => {
    image.addEventListener("click", function () {

      imageViewerImage.src = this.src;
      imageViewerImage.alt = this.alt;

      imageViewer.classList.add("active");
      imageViewer.setAttribute("aria-hidden", "false");

      document.body.classList.add("image-viewer-open");
    });
  });
 
  function closeImageViewer() {
    imageViewer.classList.remove("active");
    imageViewer.setAttribute("aria-hidden", "true");

    document.body.classList.remove("image-viewer-open");
 
    setTimeout(() => {
      if (!imageViewer.classList.contains("active")) {
        imageViewerImage.src = "";
      }
    }, 250);
  }
 
  imageViewerClose.addEventListener("click", closeImageViewer);
 
  imageViewer.addEventListener("click", function (event) {
    if (event.target === imageViewer) {
      closeImageViewer();
    }
  });
 
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && imageViewer.classList.contains("active")) {
      closeImageViewer();
    }
  });
