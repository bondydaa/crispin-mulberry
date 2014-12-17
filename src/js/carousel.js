if(typeof(crispin_mulberry) === 'undefined') {
  var crispin_mulberry = window.crispin_mulberry || {};
}

crispin_mulberry.carousel = {
  init: function(){
    this.container = $('.carousel');
    this.activeSlide = this.container.data('active-slide');
    this.slides = $('[data-slide]');
    this.numSlides = this.slides.length-1;
    this.captionHeadlines = $('[data-caption-headline]');
    this.captionDetails = $('[data-caption-details]');
    this.delayTime = 5000;

    this.addListeners.call(this);
    this.setTimer.call(this);
  },
  setTimer: function(){
    this.carouselTimer = setTimeout($.proxy(this.nextSlide, this), this.delayTime);
  },
  nextSlide: function(){
    if(this.activeSlide === this.numSlides) {
      this.container.attr('data-active-slide','0');
      this.activeSlide = 0;
    } else {
      this.activeSlide += 1;
      this.container.attr('data-active-slide', this.activeSlide);
    }
    this.toggleAriaHelpers.call(this);
    this.setTimer.call(this);
  },
  toggleAriaHelpers: function(){
    for(var x = 0; x <= this.numSlides; x++){
      if( $(this.slides[x]).data('slide') === this.activeSlide ) {
        $(this.slides[x]).attr('aria-hidden', 'false');
        $(this.captionHeadlines[x]).attr('aria-hidden', 'false');
        $(this.captionDetails[x]).attr('aria-hidden', 'false');
      } else {
        $(this.slides[x]).attr('aria-hidden', 'true');
        $(this.captionHeadlines[x]).attr('aria-hidden', 'true');
        $(this.captionDetails[x]).attr('aria-hidden', 'true');
      }
    }
  },
  addListeners: function(){
    this.container.on('mouseenter', function(e){
      clearTimeout(crispin_mulberry.carousel.carouselTimer);
    });

    this.container.on('mouseleave', $.proxy(this.setTimer, this));

    $('.carousel-thumbnails').on('click', '.carousel-thumb', function(e){
      var targetSlide = $(this).data('slide-thumb');
      crispin_mulberry.carousel.activeSlide = targetSlide;
      crispin_mulberry.carousel.toggleAriaHelpers.call(crispin_mulberry.carousel, targetSlide);
      $('.carousel').attr('data-active-slide', targetSlide);
    });
  }
};

$(document).ready(function(){
  crispin_mulberry.carousel.init();

  var ph = document.createElement('input');
  if(!('placeholder' in ph)){
    $('body').addClass('no-placeholder');
  }
});