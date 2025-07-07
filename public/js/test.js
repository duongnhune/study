
// function owl slider with attribute data
$(function () {
  $(document).ready(function () {
    if ($('.js-owl-slider').length > 0) {
      let owlSliderElements = $('.js-owl-slider');
      owlSliderElements.each(function () {
        initOwlCarousel(this);
      });
    }
  });
});

// function swiper slider with attribute data
$(function () {
  if ($('.js-swiper-slider').length > 0) {
    $('.js-swiper-slider').each(function (index, element) {
      initSwiperSlider(element);
    });
  }
});