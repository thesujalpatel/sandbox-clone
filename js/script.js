document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navOptions = document.querySelector(".nav-options");
  const carouselLeftIndicator = document.getElementById(
    "carouselLeftIndicator"
  );
  const carouselRightIndicator = document.getElementById(
    "carouselRightIndicator"
  );

  if (navToggle && navOptions) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navOptions.classList.toggle("active");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navToggle.contains(event.target) &&
        !navOptions.contains(event.target)
      ) {
        navToggle.classList.remove("active");
        navOptions.classList.remove("active");
      }
    });

    // Close mobile menu when clicking on a nav option
    const navOptionsList = navOptions.querySelectorAll(".nav-option");
    navOptionsList.forEach((option) => {
      option.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navOptions.classList.remove("active");
      });
    });

    // Close mobile menu on window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navToggle.classList.remove("active");
        navOptions.classList.remove("active");
      }
    });
  }
});
