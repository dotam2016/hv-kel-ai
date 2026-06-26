(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const initIcons = () => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const initHeader = () => {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastY && currentY > 120;

      header.classList.toggle('is-hidden', isScrollingDown);
      header.classList.toggle('is-scrolled', currentY > 10);

      lastY = Math.max(currentY, 0);
      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          window.requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  };

  const initMobileMenu = () => {
    const menuButton = document.querySelector('[data-menu-button]');
    const closeButton = document.querySelector('[data-menu-close]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const dimmed = document.querySelector('[data-menu-dimmed]');
    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    if (!menuButton || !mobileMenu || !dimmed) return;

    let closeTimer = null;

    const openMenu = () => {
      window.clearTimeout(closeTimer);
      mobileMenu.hidden = false;
      dimmed.hidden = false;
      document.body.classList.add('is-menu-open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'メニューを閉じる');
      requestAnimationFrame(() => {
        mobileMenu.classList.add('is-open');
        dimmed.classList.add('is-active');
      });
    };

    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      dimmed.classList.remove('is-active');
      document.body.classList.remove('is-menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'メニューを開く');
      closeTimer = window.setTimeout(() => {
        mobileMenu.hidden = true;
        dimmed.hidden = true;
      }, 360);
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    closeButton?.addEventListener('click', closeMenu);
    dimmed.addEventListener('click', closeMenu);
    menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  };

  const initLanguageDropdown = () => {
    const selector = document.querySelector('[data-language-selector]');
    const button = document.querySelector('[data-language-button]');
    const menu = document.querySelector('[data-language-menu]');
    if (!selector || !button || !menu) return;

    const setState = (isOpen) => {
      button.setAttribute('aria-expanded', String(isOpen));
      menu.hidden = !isOpen;
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      setState(button.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('click', (event) => {
      if (!selector.contains(event.target)) setState(false);
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setState(false);
    });
  };

  const initHeroSlider = () => {
    const slider = document.querySelector('[data-hero-slider]');
    if (!slider || !window.Swiper) return;

    new window.Swiper(slider, {
      effect: 'fade',
      loop: true,
      speed: 900,
      autoplay: prefersReducedMotion
        ? false
        : {
            delay: 5200,
            disableOnInteraction: false,
          },
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: '.hero-slider__pagination',
        clickable: true,
      },
      a11y: {
        enabled: true,
      },
    });
  };


  const initStrengthSlider = () => {
    const slider = document.querySelector('[data-strength-slider]');
    if (!slider || !window.Swiper) return;

    new window.Swiper(slider, {
      slidesPerView: 'auto',
      spaceBetween: 32,
      watchOverflow: true,
      pagination: {
        el: '.strength-slider__pagination',
        clickable: true,
      },
      breakpoints: {
        0: {
          spaceBetween: 20,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
        },
        641: {
          spaceBetween: 28,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
        1024: {
          spaceBetween: 32,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
        },
      },
    });
  };


  const initNewsTabs = () => {
    const tabButtons = document.querySelectorAll('[data-news-tab]');
    const newsItems = document.querySelectorAll('[data-news-category]');
    if (!tabButtons.length || !newsItems.length) return;

    tabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.newsTab;

        tabButtons.forEach((tab) => {
          const isActive = tab === button;
          tab.classList.toggle('is-active', isActive);
          tab.setAttribute('aria-selected', String(isActive));
        });

        newsItems.forEach((item) => {
          const shouldShow = target === 'all' || item.dataset.newsCategory === target;
          item.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
  };

  const initCountUp = () => {
    const targets = document.querySelectorAll('[data-count-target]');
    if (!targets.length) return;

    const animate = (el) => {
      const target = Number(el.dataset.countTarget || 0);
      if (!Number.isFinite(target)) return;
      if (prefersReducedMotion) {
        el.textContent = String(target);
        return;
      }

      const duration = 1100;
      const start = performance.now();
      const from = 0;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(from + (target - from) * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    targets.forEach((target) => observer.observe(target));
  };

  const initParallax = () => {
    const parallaxImages = document.querySelectorAll('[data-parallax-bg]');
    if (!parallaxImages.length || prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const viewportH = window.innerHeight;
      parallaxImages.forEach((image) => {
        const section = image.closest('[data-parallax-section]');
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const progress = (viewportH - rect.top) / (viewportH + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const translate = (clamped - 0.5) * 140;
        image.style.transform = `translate3d(0, ${translate}px, 0) scale(1.1)`;
      });
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
  };


  const initBackToTop = () => {
    const button = document.querySelector('[data-back-to-top]');
    if (!button) return;

    let ticking = false;

    const update = () => {
      button.classList.toggle('is-visible', window.scrollY > 100);
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
  };

  const initAOS = () => {
    if (!window.AOS) return;
    window.AOS.init({
      duration: 980,
      easing: 'ease-out-cubic',
      once: true,
      anchorPlacement: 'top-bottom',
      offset: 130,
      disable: () => prefersReducedMotion,
    });
  };

  initIcons();
  initHeader();
  initMobileMenu();
  initLanguageDropdown();
  initHeroSlider();
  initStrengthSlider();
  initNewsTabs();
  initCountUp();
  initParallax();
  initBackToTop();
  initAOS();
})();
