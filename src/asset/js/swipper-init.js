const swiper = new Swiper('.tech-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2000, // 2000ms = 2 detik antar slide
    disableOnInteraction: false, // tetap jalan meski user geser manual
  },
});
