/**
 * Initializes an Owl Carousel on the specified element.
 *
 * @param {HTMLElement} el
 */
function initOwlCarousel(el) {
  let owlSliderElement = $(el);
  let owlSliderElementItems = 1;
  if (owlSliderElement.data('items')) {
    owlSliderElementItems = owlSliderElement.data('items');
  }
  let owlSliderElementMargin = 0;
  if (owlSliderElement.data('margin')) {
    owlSliderElementMargin = owlSliderElement.data('margin');
  }
  let owlSliderElementLoop = false;
  if (owlSliderElement.data('loop')) {
    owlSliderElementLoop = owlSliderElement.data('loop');
  }
  let owlSliderElementCenter = false;
  if (owlSliderElement.data('center')) {
    owlSliderElementCenter = owlSliderElement.data('center');
  }
  let owlSliderElementNav = false;
  if (owlSliderElement.data('nav')) {
    owlSliderElementNav = owlSliderElement.data('nav');
  }
  let owlSliderElementDots = false;
  if (owlSliderElement.data('dots')) {
    owlSliderElementDots = owlSliderElement.data('dots');
  }
  let owlSliderElementAutoPlay = false;
  if (owlSliderElement.data('autoplay')) {
    owlSliderElementAutoPlay = owlSliderElement.data('autoplay');
  }
  let owlSliderElementAutoPlayTimeOut = 5000;
  if (owlSliderElement.data('autoplay-timeout')) {
    owlSliderElementAutoPlayTimeOut = owlSliderElement.data('autoplay-timeout');
  }
  let owlSliderElementAutoPlaySpeed = 1000;
  if (owlSliderElement.data('autoplay-speed')) {
    owlSliderElementAutoPlaySpeed = owlSliderElement.data('autoplay-speed');
  }
  let owlSliderElementAutoPlayHoverPause = false;
  if (owlSliderElement.data('autoplay-hover-pause')) {
    owlSliderElementAutoPlayHoverPause = owlSliderElement.data('autoplay-hover-pause');
  }
  let owlSliderElementLazyLoad = false;
  if (owlSliderElement.data('lazy-load')) {
    owlSliderElementLazyLoad = owlSliderElement.data('lazy-load');
  }
  let owlSliderElementResponsive = {}
  if (owlSliderElement.data('responsive')) {
    owlSliderElementResponsive = owlSliderElement.data('responsive');
  }
  //convert string to object
  if (typeof owlSliderElementResponsive === 'string') {
    try {
      owlSliderElementResponsive = JSON.parse(owlSliderElementResponsive.replace(/'/g, '"'));
    } catch (e) {
      console.error('Invalid JSON format for responsive:', e);
      owlSliderElementResponsive = {};
    }
  }
  owlSliderElement.owlCarousel({
    items: owlSliderElementItems,
    margin: owlSliderElementMargin,
    loop: owlSliderElementLoop,
    center: owlSliderElementCenter,
    nav: owlSliderElementNav,
    dots: owlSliderElementDots,
    autoplay: owlSliderElementAutoPlay,
    autoplayTimeout: owlSliderElementAutoPlayTimeOut,
    autoplaySpeed: owlSliderElementAutoPlaySpeed,
    autoplayHoverPause: owlSliderElementAutoPlayHoverPause,
    lazyLoad: owlSliderElementLazyLoad,
    navText: false,
    autoHeight: false,
    responsiveClass: false,
    responsive: owlSliderElementResponsive,
    onInitialized: function(event) {
      let firstItem = $(event.target).find('.owl-item.active').first();
      firstItem.addClass('first-item');
    },
    onChanged: function(event) {
      let currentItem = $(event.target).find('.owl-item.first-item');
      currentItem.removeClass('first-item');
      let newItem = $(event.target).find('.owl-item').eq(event.item.index);
      newItem.addClass('first-item');
    }
  });
}

/**
 * Initializes a Swiper Slider on the specified element.
 *
 * @param {HTMLElement} el
 */
function initSwiperSlider(el) {
  let swiperSliderElement = $(el);
  let swiperSliderElementDirection = 'horizontal';
  if (swiperSliderElement.data('direction')) {
    swiperSliderElementDirection = swiperSliderElement.data('direction');
  }
  let swiperSliderElementSlidesPerView = 1;
  if (swiperSliderElement.data('slides-per-view')) {
    swiperSliderElementSlidesPerView = swiperSliderElement.data('slides-per-view');
  }
  let swiperSliderElementSpaceBetween = 0;
  if (swiperSliderElement.data('space-between')) {
    swiperSliderElementSpaceBetween = swiperSliderElement.data('space-between');
  }
  let swiperSliderElementLoop = false;
  if (swiperSliderElement.data('loop')) {
    swiperSliderElementLoop = swiperSliderElement.data('loop');
  }
  let swiperSliderElementAutoplay = false;
  if (swiperSliderElement.data('autoplay')) {
    swiperSliderElementAutoplay = swiperSliderElement.data('autoplay');
  }
  let swiperSliderElementAutoplayDelay = 5000; // default delay
  if (swiperSliderElement.data('autoplay-delay')) {
    swiperSliderElementAutoplayDelay = swiperSliderElement.data('autoplay-delay');
  }
  let swiperSliderElementAutoplayHoverPause = false;
  if (swiperSliderElement.data('autoplay-hover-pause')) {
    swiperSliderElementAutoplayHoverPause = swiperSliderElement.data('autoplay-hover-pause');
  }
  let swiperSliderElementLazyLoad = false;
  if (swiperSliderElement.data('lazy-load')) {
    swiperSliderElementLazyLoad = swiperSliderElement.data('lazy-load');
  }
  let swiperSliderElementGrabCursor = false;
  if (swiperSliderElement.data('grab-cursor')) {
    swiperSliderElementGrabCursor = swiperSliderElement.data('grab-cursor');
  }
  let swiperSliderElementCenteredSlides = false;
  if (swiperSliderElement.data('centered-slides')) {
    swiperSliderElementCenteredSlides = swiperSliderElement.data('centered-slides');
  }
  let swiperSliderElementEffect = 'slide';
  if (swiperSliderElement.data('effect')) {
    swiperSliderElementEffect = swiperSliderElement.data('effect');
  }
  let swiperSliderElementBreakpoints = {};
  if (swiperSliderElement.data('breakpoints')) {
    swiperSliderElementBreakpoints = swiperSliderElement.data('breakpoints');
  }
  if (typeof swiperSliderElementBreakpoints === 'string') {
    try {
      swiperSliderElementBreakpoints = JSON.parse(swiperSliderElementBreakpoints.replace(/'/g, '"'));
    } catch (e) {
      console.error('Invalid JSON format for breakpoints:', e);
      swiperSliderElementBreakpoints = {};
    }
  }
  let swiperSliderElementCoverflowEffect = {};
  if (swiperSliderElement.data('coverflow-effect')) {
    swiperSliderElementCoverflowEffect = swiperSliderElement.data('coverflow-effect');
  }
  if (typeof swiperSliderElementCoverflowEffect === 'string') {
    try {
      swiperSliderElementCoverflowEffect = JSON.parse(swiperSliderElementCoverflowEffect.replace(/'/g, '"'));
    } catch (e) {
      console.error('Invalid JSON format for coverflow effect:', e);
      swiperSliderElementCoverflowEffect = {};
    }
  }
  let swiperConfig = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    direction: swiperSliderElementDirection,
    slidesPerView: swiperSliderElementSlidesPerView,
    spaceBetween: swiperSliderElementSpaceBetween,
    loop: swiperSliderElementLoop,
    lazy: swiperSliderElementLazyLoad,
    grabCursor: swiperSliderElementGrabCursor,
    centeredSlides: swiperSliderElementCenteredSlides,
    effect: swiperSliderElementEffect,
    breakpoints: swiperSliderElementBreakpoints,
    coverflowEffect: swiperSliderElementCoverflowEffect,
  };
  if (swiperSliderElementAutoplay) {
    swiperConfig.autoplay = {
      delay: swiperSliderElementAutoplayDelay,
      disableOnInteraction: false,
      pauseOnMouseEnter: swiperSliderElementAutoplayHoverPause,
    };
  }
  new Swiper(swiperSliderElement[0], swiperConfig);
}

window.initOwlCarousel = initOwlCarousel;
window.initSwiperSlider = initSwiperSlider;