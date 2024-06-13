let slidesToShow = 4; // Por defecto, muestra 4 slides por vista

if (window.matchMedia("(max-width: 720px)").matches) {
    slidesToShow = 1;
} else if (window.matchMedia("(max-width: 1120px)").matches) {
    slidesToShow = 2;
} else if (window.matchMedia("(max-width: 1720px)").matches) {
    slidesToShow = 3;
} else {
    slidesToShow = 4;
} 
let swiper = new Swiper(".mySwiper", {
  slidesPerView: slidesToShow,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Slider
