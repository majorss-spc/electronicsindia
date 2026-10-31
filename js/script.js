"use strict";

(() => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
      document.body.classList.remove("menu-open");
    };

    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      nav.classList.toggle("is-open", !isOpen);
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      document.body.classList.toggle("menu-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target instanceof Node && !nav.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealItems.forEach((item) => observer.observe(item));

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImage = lightbox ? lightbox.querySelector("img") : null;
  const lightboxCaption = lightbox ? lightbox.querySelector(".lightbox__caption") : null;
  const lightboxClose = lightbox ? lightbox.querySelector(".lightbox__close") : null;

  document.querySelectorAll("[data-gallery-image]").forEach((tile) => {
    tile.addEventListener("click", () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) return;
      lightboxImage.src = tile.dataset.galleryImage;
      lightboxImage.alt = tile.dataset.galleryAlt || "";
      lightboxCaption.textContent = tile.dataset.galleryAlt || "";
      lightbox.showModal();
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener("click", () => lightbox.close());
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
  }

  const form = document.getElementById("enquiry-form");
  const formStatus = document.getElementById("form-status");

  if (form && formStatus) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const name = (formData.get("name") || "").toString().trim();
      const phone = (formData.get("phone") || "").toString().trim();
      const device = (formData.get("device") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();

      const whatsappText = encodeURIComponent(
        `Hello Electronics India, I need help with my ${device}.\n\nName: ${name}\nPhone: ${phone}\nIssue: ${message}`
      );
      const url = `https://wa.me/919643224873?text=${whatsappText}`;
      window.open(url, "_blank", "noopener,noreferrer");
      formStatus.textContent = "Your WhatsApp message is ready to send.";
    });
  }
})();
