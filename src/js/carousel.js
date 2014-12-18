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
    this.noPlaceholderSupport = $('body').hasClass('no-placeholder');

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
    if (this.noPlaceholderSupport) {
      this.container.addClass('z').removeClass('z');
    }
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
  pickSlide: function(e){
    var targetSlide = $(e.target).closest('.carousel-thumb').data('slide-thumb');
    this.activeSlide = targetSlide;
    this.toggleAriaHelpers.call(this);
    this.container.attr('data-active-slide', targetSlide);

    if (this.noPlaceholderSupport) {
      this.container.addClass('z').removeClass('z');
    }
  },
  addListeners: function(){
    this.container.on('mouseenter', function(e){
      clearTimeout(crispin_mulberry.carousel.carouselTimer);
    });

    this.container.on('mouseleave', $.proxy(this.setTimer, this));

    $('.carousel-thumbnails').on('click', '.carousel-thumb', $.proxy(this.pickSlide, this));
  }
};

$(document).ready(function(){
  var ph = document.createElement('input');
  if(!('placeholder' in ph)){
    $('body').addClass('no-placeholder');
  }

  crispin_mulberry.carousel.init();
});