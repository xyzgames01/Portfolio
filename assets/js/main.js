/**
 * Template Name: MyResume
 * Updated: Mar 10 2024 with Bootstrap v5.3.3
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
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
    let navbarlinks = select("#navbar .scrollto", true); // Assuming this is your navbar links selector

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
  on('click', '.scrollto', function(e) {
    e.preventDefault(); // Prevent default anchor click behavior

    // Use the 'select' helper function to get the destination to scroll to
    var scrollTarget = select(this.getAttribute('href'));
    if (scrollTarget) {
      // Smoothly scroll to the element
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, true);

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
