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
  const carousel = document.querySelector(".project-carousel");

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

  // Carousel Navigation
  if (carousel && carouselLeftIndicator && carouselRightIndicator) {
    let currentIndex = 0;
    const items = carousel.children;
    const totalItems = items.length;

    // Calculate how much to move per click
    function getScrollDistance() {
      const container = carousel.parentElement;
      const containerWidth = container.offsetWidth;

      if (window.innerWidth <= 768) {
        // Mobile: move by full container width (showing 1 item)
        return containerWidth - 100; // Account for padding
      } else if (window.innerWidth <= 920) {
        // Tablet: move by ~48% of container width
        return (containerWidth - 100) * 0.48;
      } else {
        // Desktop: move by ~49% of container width
        return (containerWidth - 100) * 0.49;
      }
    }

    // Get maximum number of steps
    function getMaxSteps() {
      if (window.innerWidth <= 768) {
        return totalItems - 1; // Show 1 item at a time on mobile
      } else {
        return Math.max(0, totalItems - 2); // Show 2 items at a time on desktop/tablet
      }
    }

    // Left arrow click
    carouselLeftIndicator.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        const distance = currentIndex * getScrollDistance();
        carousel.style.transform = `translateX(-${distance}px)`;
      }
    });

    // Right arrow click
    carouselRightIndicator.addEventListener("click", function () {
      const maxSteps = getMaxSteps();
      if (currentIndex < maxSteps) {
        currentIndex++;
        const distance = currentIndex * getScrollDistance();
        carousel.style.transform = `translateX(-${distance}px)`;
      }
    });

    // Update calculations on window resize
    window.addEventListener("resize", function () {
      // Recalculate position after resize
      const maxSteps = getMaxSteps();
      currentIndex = Math.min(currentIndex, maxSteps);
      const distance = currentIndex * getScrollDistance();
      carousel.style.transform = `translateX(-${distance}px)`;
    });

    // Optional: Add touch/swipe support
    // let startX = 0;
    // let isDragging = false;

    // carousel.addEventListener("touchstart", function (e) {
    //   startX = e.touches[0].clientX;
    //   isDragging = true;
    // });

    // carousel.addEventListener("touchmove", function (e) {
    //   if (!isDragging) return;
    //   e.preventDefault();
    // });

    // carousel.addEventListener("touchend", function (e) {
    //   if (!isDragging) return;
    //   isDragging = false;

    //   const endX = e.changedTouches[0].clientX;
    //   const diffX = startX - endX;

    //   if (Math.abs(diffX) > 50) {
    //     // Minimum swipe distance
    //     if (diffX > 0) {
    //       // Swipe left - go to next
    //       carouselRightIndicator.click();
    //     } else {
    //       // Swipe right - go to previous
    //       carouselLeftIndicator.click();
    //     }
    //   }
    // });

    // Mouse wheel support
    // carousel.addEventListener("wheel", function (e) {
    //   if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    //     // Horizontal scroll - let it pass
    //     return;
    //   }

    //   // Vertical scroll - convert to carousel navigation
    //   e.preventDefault();
    //   if (e.deltaY > 0) {
    //     carouselRightIndicator.click();
    //   } else {
    //     carouselLeftIndicator.click();
    //   }
    // });
  }
});
