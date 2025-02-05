/**
 * Template Name: MyResume
 * License: https://bootstrapmade.com/license/ Single Website License
 * Added and Changed alot from template
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   * Edited By Zachary Zawodny
   */
  const navbarlinksActive = () => {
    let offset = 100;
    let position = window.scrollY + offset;
    let heroSection = select("#hero");
    let navbarlinks = select("#navbar .scrollto", true);

    // Initially remove active class from all links
    navbarlinks.forEach((link) => link.classList.remove("active"));

    let heroLink = navbarlinks.find((link) => link.hash === "#hero");

    // Condition for the hero section being active
    if (position <= heroSection.offsetHeight) {
      if (heroLink) heroLink.classList.add("active");
    } else {
      // Check other sections after the hero section
      if (heroLink) heroLink.classList.remove("active");
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash || select(navbarlink.hash) === heroSection) return;
        let section = select(navbarlink.hash);
        if (!section) return;

        let sectionTop = section.offsetTop + heroSection.offsetHeight;
        let sectionBottom = sectionTop + section.offsetHeight;

        // Special case for sections with the same offsetTop as hero
        if (sectionTop === 0 && section !== heroSection) {
          sectionTop = heroSection.offsetHeight; // Start checking after heroSection
          sectionBottom =
            sectionTop + section.offsetHeight + heroSection.offsetHeight;
        }

        if (position >= sectionTop && position <= sectionBottom) {
          navbarlink.classList.add("active");
        }
      });
    }
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * scroll to hash with out it in the url
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      e.preventDefault(); // Prevent default anchor click behavior

      // Use the 'select' helper function to get the destination to scroll to
      var scrollTarget = select(this.getAttribute("href"));
      if (scrollTarget) {
        // Smoothly scroll to the element
        scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    true
  );

  /**
   * Hero Button Custom scroll because of paralax
   */
  on("click", "#heroButton", function (e) {
    e.preventDefault(); // Prevent the default anchor action
    // Smoothly scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".skill-card").forEach((card) => {
      card.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from propagating to the document
        const targetId = card.getAttribute("data-target");
        const dropdown = document.getElementById(targetId);

        // Toggle visibility
        const isVisible =
          dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px";

        // Close all dropdowns
        document.querySelectorAll(".skill-dropdown").forEach((el) => {
          el.style.maxHeight = "0px";
        });

        // Open the clicked dropdown if it was not already visible
        if (!isVisible) {
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        }
      });
    });

    // Add click listener to the document to close the dropdown when clicking outside
    document.addEventListener("click", () => {
      document.querySelectorAll(".skill-dropdown").forEach((el) => {
        el.style.maxHeight = "0px";
      });
    });
  });

  // Shake to alert that this is clickable
  document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.querySelectorAll(".skill-card");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a delay before adding the shake animation
          setTimeout(() => {
            entry.target.classList.add("shake-animation");
          }, 2800); // 3000ms = 3 seconds
        }
      });
    });

    skillCards.forEach((card) => observer.observe(card));
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Initiate portfolio details lightbox
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: ".portfolio-details-lightbox",
    width: "90%",
    height: "90vh",
  });

  /**
   * Portfolio details slider
   */
  const portfolioSwiper = new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Pause Slider when playing video
  document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.swiper-slide video');
  
    videos.forEach(video => {
      video.addEventListener('play', () => {
        portfolioSwiper.autoplay.stop();
      });
  
      video.addEventListener('pause', () => {
        portfolioSwiper.autoplay.start();
      });
  
      video.addEventListener('ended', () => {
        portfolioSwiper.autoplay.start();
      });
    });
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  //Form spree ajax
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const responseMessage = document.getElementById("form-response");

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(form);
      const actionUrl = "https://formspree.io/f/xldgbvdo"; // Replace with your Formspree ID

      try {
        const response = await fetch(actionUrl, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Show success message
          responseMessage.style.display = "block";
          responseMessage.textContent =
            "Thank you for your message! I’ll get back to you soon.";

          // Clear the form
          form.reset();
        } else {
          // Show error message
          responseMessage.style.display = "block";
          responseMessage.textContent =
            "Oops! Something went wrong. Please try again.";
          responseMessage.style.color = "red";
        }
      } catch (error) {
        console.error("Error:", error);
        responseMessage.style.display = "block";
        responseMessage.textContent =
          "Oops! Something went wrong. Please try again.";
        responseMessage.style.color = "red";
      }
    });
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
