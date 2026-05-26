// ======================================================
// BOOTSTRAP FORM VALIDATION
// ======================================================

(() => {
  "use strict";

  // Fetch all forms
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over forms
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",

      (event) => {
        // Prevent invalid form submission
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        // Add validation class
        form.classList.add("was-validated");
      },

      false,
    );
  });
})();

// ======================================================
// SMOOTH SCROLLING
// ======================================================

document
  .querySelectorAll('a[href^="#"]')

  .forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

// ======================================================
// NAVBAR SCROLL EFFECT
// ======================================================

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  // Add shadow while scrolling
  if (window.scrollY > 50) {
    navbar.classList.add("shadow");
  } else {
    navbar.classList.remove("shadow");
  }
});

// ======================================================
// CARD HOVER EFFECT
// ======================================================

const cards = document.querySelectorAll(".listing-card");

cards.forEach((card) => {
  // Mouse Enter
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  // Mouse Leave
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0px)";
  });
});

// ======================================================
// IMAGE FADE-IN EFFECT
// ======================================================

window.addEventListener("load", () => {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.style.opacity = "0";

    img.style.transition = "opacity 0.6s ease";

    // Fade image in
    setTimeout(() => {
      img.style.opacity = "1";
    }, 100);
  });
});

// ======================================================
// AUTO CLOSE FLASH MESSAGES
// ======================================================

const alerts = document.querySelectorAll(".alert");

alerts.forEach((alert) => {
  setTimeout(() => {
    // Bootstrap fade effect
    alert.classList.remove("show");
  }, 3000);
});

// ======================================================
// SEARCH INPUT FOCUS EFFECT
// ======================================================

const searchInput = document.querySelector('input[name="search"]');

if (searchInput) {
  searchInput.addEventListener("focus", () => {
    searchInput.style.boxShadow = "0 0 0 0.2rem rgba(0,0,0,0.15)";
  });

  searchInput.addEventListener("blur", () => {
    searchInput.style.boxShadow = "none";
  });
}
