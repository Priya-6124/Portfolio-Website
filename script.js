document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll("main section[id]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    },
    { rootMargin: "-35% 0px -50% 0px" }
  );

  sections.forEach((sec) => navObserver.observe(sec));

  // Project Category Filter
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });

  // Project Modal Handling
  const modal = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalTechTag = document.getElementById("modal-tech-tag");
  const modalText = document.getElementById("modal-text");
  const modalGithubLink = document.getElementById("modal-github-link");
  const modalDemoBtn = document.getElementById("modal-demo-btn");

  const openModalBtns = document.querySelectorAll(".open-modal-btn");

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const title = btn.dataset.project;
      const tech = btn.dataset.tech;
      const details = btn.dataset.details;
      const github = btn.dataset.github || "https://github.com/Priya-6124";
      const demo = btn.dataset.demo;

      if (modalTitle) modalTitle.textContent = title;
      if (modalTechTag) modalTechTag.textContent = tech;
      if (modalText) modalText.textContent = details;
      if (modalGithubLink) modalGithubLink.href = github;

      if (demo && modalDemoBtn) {
        modalDemoBtn.href = demo;
        modalDemoBtn.style.display = "inline-flex";
      } else if (modalDemoBtn) {
        modalDemoBtn.style.display = "none";
      }

      if (modal) {
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Certificate Lightbox Modal Handling (Clean Certificate Display)
  const certModal = document.getElementById("cert-modal");
  const certModalClose = document.getElementById("cert-modal-close");
  const certModalCloseBtn = document.getElementById("cert-modal-close-btn");
  const certModalTitle = document.getElementById("cert-modal-title");
  const certModalIssuer = document.getElementById("cert-modal-issuer");
  const certModalId = document.getElementById("cert-modal-id");
  const certModalDate = document.getElementById("cert-modal-date");
  const certModalImg = document.getElementById("cert-modal-img");
  const copyCertIdBtn = document.getElementById("copy-cert-id-btn");

  const certModalTriggers = document.querySelectorAll(".open-cert-modal-btn, .cert-card");

  function openCertModal(elem) {
    const title = elem.dataset.title || elem.getAttribute("data-title");
    const issuer = elem.dataset.issuer || elem.getAttribute("data-issuer");
    const certId = elem.dataset.id || elem.getAttribute("data-id");
    const date = elem.dataset.date || elem.getAttribute("data-date");
    const img = elem.dataset.img || elem.getAttribute("data-img");

    if (certModalTitle) certModalTitle.textContent = title;
    if (certModalIssuer) certModalIssuer.textContent = issuer;
    if (certModalId) certModalId.textContent = certId;
    if (certModalDate) certModalDate.innerHTML = `<i class="fa-regular fa-calendar"></i> ${date}`;
    if (certModalImg) {
      certModalImg.src = img;
      certModalImg.alt = title;
    }

    if (certModal) {
      certModal.classList.add("open");
      certModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeCertModal() {
    if (certModal) {
      certModal.classList.remove("open");
      certModal.setAttribute("aria-hidden", "true");
    }
  }

  certModalTriggers.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      // If clicking inside cert-card, avoid duplicate event trigger if button clicked
      if (elem.classList.contains("cert-card") && e.target.closest(".open-cert-modal-btn") && elem !== e.target.closest(".open-cert-modal-btn")) {
        return;
      }
      openCertModal(elem);
    });
  });

  if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
  if (certModalCloseBtn) certModalCloseBtn.addEventListener("click", closeCertModal);

  if (certModal) {
    certModal.addEventListener("click", (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  if (copyCertIdBtn) {
    copyCertIdBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idText = certModalId.textContent;
      navigator.clipboard.writeText(idText).then(() => {
        copyCertIdBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          copyCertIdBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
      });
    });
  }

  // Send Message Lightbox Modal Handling
  const sendMsgModal = document.getElementById("send-message-modal");
  const sendMsgModalClose = document.getElementById("send-msg-modal-close");
  const sendMsgModalCancel = document.getElementById("send-msg-modal-cancel");
  const sendMsgForm = document.getElementById("send-message-form");
  const sendMsgSubmitBtn = document.getElementById("send-msg-submit-btn");
  const openSendMsgBtns = document.querySelectorAll(".open-send-msg-btn");

  function openSendMsgModal() {
    if (sendMsgModal) {
      sendMsgModal.classList.add("open");
      sendMsgModal.setAttribute("aria-hidden", "false");
      const nameInput = document.getElementById("msg-user-name");
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }
  }

  function closeSendMsgModal() {
    if (sendMsgModal) {
      sendMsgModal.classList.remove("open");
      sendMsgModal.setAttribute("aria-hidden", "true");
    }
  }

  openSendMsgBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openSendMsgModal();
    });
  });

  if (sendMsgModalClose) sendMsgModalClose.addEventListener("click", closeSendMsgModal);
  if (sendMsgModalCancel) sendMsgModalCancel.addEventListener("click", closeSendMsgModal);

  if (sendMsgModal) {
    sendMsgModal.addEventListener("click", (e) => {
      if (e.target === sendMsgModal) closeSendMsgModal();
    });
  }

  if (sendMsgForm) {
    sendMsgForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (sendMsgSubmitBtn) {
        sendMsgSubmitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        sendMsgSubmitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      }
      setTimeout(() => {
        closeSendMsgModal();
        sendMsgForm.reset();
        if (sendMsgSubmitBtn) {
          sendMsgSubmitBtn.innerHTML = '<i class="fa-regular fa-paper-plane"></i> Send Message';
          sendMsgSubmitBtn.style.background = '';
        }
      }, 1500);
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Subtle 3D Card Hover Effect for Desktop
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth < 992) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modal && modal.classList.contains("open")) closeModal();
      if (certModal && certModal.classList.contains("open")) closeCertModal();
      if (sendMsgModal && sendMsgModal.classList.contains("open")) closeSendMsgModal();
    }
  });
});
