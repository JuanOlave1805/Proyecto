// Función para ajustar slidesToShow según el ancho de la pantalla
function updateSlidesToShow() {
  const width = window.innerWidth;
  if (width <= 720) {
    return 1;
  } else if (width <= 1120) {
    return 2;
  } else if (width <= 1980) {
    return 3;
  } else {
    return 4;
  }
}

// Inicialización del swiper con los valores iniciales
let swiper = new Swiper(".mySwiper", {
  slidesPerView: updateSlidesToShow(),
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Habilitar manipulación con el mouse
  mousewheel: true,
});

// Actualizar el número de slides cuando se redimensiona la ventana
window.addEventListener('resize', () => {
  swiper.params.slidesPerView = updateSlidesToShow();
  swiper.update();
});