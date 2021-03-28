// new WOW().init();

$('.trending-slider').slick({
  dots: false,
  infinite: true,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 1500,
  slidesToShow: 2,
  slidesToScroll: 1,
  prevArrow: '<img src="html-assets/images/Group1151.png" class="img-fluid arrow-left" alt="arrow">',
  nextArrow: '<img src="html-assets/images/Group1152.png" class="img-fluid arrow-right" alt="arrow">',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1  	  
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
$('.navbar-nav-custom .dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});
