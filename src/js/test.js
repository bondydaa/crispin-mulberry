$('.marquee-thumb').on('click', '.thumbnail', function(e){
  $(e.target).parent().toggleClass('active');
})