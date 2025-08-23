document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },

    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2 }
    }
  });

  const swiperFill = document.getElementById('SwiperFill');
  const swiperContainer = document.getElementById('swiperContainer');

  function updateSwiperFill(index) {
    const totalSlides = 4;
    const widthPercentage = 100 / totalSlides;
    const leftPosition = index * widthPercentage;
    document.getElementById('SwiperFill').style.left = `${leftPosition}%`;
  }

  swiper.on('slideChange', () => {
    updateSwiperFill(swiper.realIndex);
  });

  updateSwiperFill(swiper.realIndex);
  ;

  let swiperInView = false;

  const swiperObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      swiperInView = entry.isIntersecting;
      if (!swiperInView) {
        swiperFill.style.width = '0%';
      } else {
        updateSwiperFill(swiper.realIndex);
      }
    });
  }, { threshold: 0.1 });

  swiperObserver.observe(swiperContainer);

  swiper.on('slideChange', function () {
    if (swiperInView) {
      updateSwiperFill(swiper.realIndex);
    }
  });

  const fadeInSections = document.querySelectorAll('.fade-in-section, .fade-in-address');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible', 'fade-in-address-visible');
      } else {
        entry.target.classList.remove('is-visible', 'fade-in-address-visible');
      }
    });
  }, { threshold: 0.1 });

  fadeInSections.forEach(section => observer.observe(section));
});