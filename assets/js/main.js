
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });
  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

/*
	Salient by TEMPLATE STOCK
	templatestock.co @templatestock
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var $ = jQuery.noConflict();

$(document).ready(function($) {
    "use strict";

    /* global google: false */

    /* ==============================================
        Full height home-section
    =============================================== */
    
	var windowHeight = $(window).height(),
		topSection = $('#hero-section');
	topSection.css('height', windowHeight);

	$(window).resize(function(){
		var windowHeight = $(window).height();
		topSection.css('height', windowHeight);       
	});

    /* ==============================================
        Collapse menu on click
    =============================================== */

        $('.navbar-collapse a:not(.dropdown-toggle)').click(function(){
            if($(window).width() < 768 )
                $('.navbar-collapse').collapse('hide');
        });

    /* ==============================================
        Scrollspy
    =============================================== */

        $('body').scrollspy({
           target: '#navigation-nav',
           offset: 140      //px/
        });

    /* ==============================================
        Parallax
    =============================================== */
    
    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Hero slider
    =============================================== */

    $('.caption-slides').bxSlider({
      pager: false,
      mode: 'fade',
      adaptiveHeight: true,
      controls: false,
      auto: true
    });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */  

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
                  scrollTop: target.offset().top -66
            }, 1000);
            return false;
          }
        }
    });

    /* ==============================================
     Bootstrap Tooltip
    =============================================== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {   
        var dataperc;   
        $('.statistic-percent').each(function(){
            dataperc = $(this).attr('data-perc'),
            $(this).find('.percentfactor').delay(6000).countTo({
                from: 0,                 // number to begin counting
                to: dataperc,      
                speed: 1000,             // ms
                refreshInterval: 10,
            });  
        });
    }
        
    $('.statistic-percent').waypoint(function() {
        countUp();
    },
    {
        offset: '95%',                 
        triggerOnce: true
    });

    /* ==============================================
        Skills bar
    =============================================== */

        $('.progress-bar').each(function(i) {
            $(this).appear(function() {
                var percent = $(this).attr('aria-valuenow');
                $(this).animate({'width' : percent + '%'});
            });
        });

    /* ==============================================
    Placeholder
    =============================================== */ 

    $('input, textarea').placeholder();

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function(){
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function(){
                el.addClass( anim + " in" );
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass( anim + " in" );
            el.removeClass('out');
        }    
    },{accY: -150});  
    

    /* ==============================================
        MailChip
    =============================================== */

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://clas-design.us10.list-manage.com/subscribe/post?u=5ca5eb87ff7cef4f18d05e127&amp;id=9c23c46672" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
    });

    function mailchimpCallback(resp) {
         if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon-happy"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);
        
        } else if(resp.result === 'error') {
            $('.subscription-error').html('<span class="icon-sad"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }  
    }


    /* ==============================================
    Contact Form
    =============================================== */

    $('#contactform').submit(function(){

        var action = $(this).attr('action');

        $("#alert").slideUp(750,function() {
            $('#alert').hide();

        $('#submit')
            .after('<img src="../images/ajax-loader.GIF" class="contactloader" />')
            .attr('disabled','disabled');

        $.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            message: $('#message').val()
        },
            function(data){
                document.getElementById('alert').innerHTML = data;
                $('#alert').slideDown('slow');
                $('#contactform img.contactloader').fadeOut('slow',function(){$(this).remove();});
                $('#submit').removeAttr('disabled');
                if(data.match('success') !== null) {
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');
                }
            }
        );

        });

        return false;

    });

    // Countdown
    // To change date, simply edit: var endDate = "June 26, 2015 20:39:00";
    $(function() {
      var endDate = "June 26, 2016 20:39:00";
      $('.soon-countdown .row').countdown({
        date: endDate,
        render: function(data) {
          $(this.el).html('<div><div><span>' + (parseInt(this.leadingZeros(data.years, 2)*365) + parseInt(this.leadingZeros(data.days, 2))) + '</span><span>days</span></div><div><span>' + this.leadingZeros(data.hours, 2) + '</span><span>hours</span></div></div><div class="lj-countdown-ms"><div><span>' + this.leadingZeros(data.min, 2) + '</span><span>minutes</span></div><div><span>' + this.leadingZeros(data.sec, 2) + '</span><span>seconds</span></div></div>');
        }
      });
    });


    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

    /* ==============================================
        Google Map
    =============================================== */

        var mapLocation = new google.maps.LatLng(34.031428,-118.2071542,17);
        var $mapis = $('#map');
        if ($mapis.length > 0) {
            var map;
            map = new GMaps({
                streetViewControl : true,
                overviewMapControl: true,
                mapTypeControl: true,
                zoomControl : true,
                panControl : true,
                scrollwheel: false,
                center: mapLocation,
                el: '#map',
                zoom: 16,
                styles: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
            });
            var image = new google.maps.MarkerImage('../images/map-icon.png');
            map.addMarker({
                position: mapLocation,
                icon: image,
                title: 'Visia',
                infoWindow: {
                    content: '<p><strong>Visia</strong><br/>121 Somewhere Ave, Suite 123<br/>P: (123) 456-7890<br/>Australia</p>'
                }
            });
        }

    /* ==============================================
     BX-Project Slider
    =============================================== */

        $(".project-slider").bxSlider({
            pager: false,
            controls: true,
            auto: true,        // Boolean:  (true/false)
            speed: 500,        // Animation speed.
            pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            useCSS: false     // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Project Slider
    =============================================== */

        $(".blog-slider").bxSlider({
            pager: false,
            controls: true,
            auto: true,        // Boolean:  (true/false)
            speed: 500,        // Animation speed.
            pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
            useCSS: false     // Boolean:  (true/false)
        });

    /* ==============================================
     BX-Slider Tweet&Process
    =============================================== */


        $('.tweet-slider').bxSlider({
          adaptiveHeight: true,
          controls: false,
          auto: true
        });

    /* ==============================================
        BxSlider Testimonial
    =============================================== */ 

    $(".testimonials-slider").bxSlider({
        nextSelector: ".tc-arrows .tc-arrow-right",
        prevSelector: ".tc-arrows .tc-arrow-left",
        nextText: "<i class='fa fa-angle-right'></i>",
        prevText: "<i class='fa fa-angle-left'></i>",
        pager: false,
        auto: true,          // Boolean:  (true/false)
        pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
        mode: 'vertical',    // Choose fade, slide
        useCSS: false        // Boolean:  (true/false)
    });

    /* ==============================================
        OWL Carousel
    =============================================== */

        $(".owl-carousel").owlCarousel({
 
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 4,
            itemsDesktop : [1199,3], //number of items displayed on resolution less then 1199px
            itemsDesktopSmall : [979,3] //number of items displayed on resolution less then 979px
 
        });

    /* ==============================================
        Responsive video
    =============================================== */
    
        $(".project-video, .video-creative, .video-post").fitVids();
        

    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */
    
        // Example with multiple objects
        $('.zoom').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.video-pop-up').magnificPopup({
            type: 'iframe',
        });

    /* ==============================================
        OWL Carousel (initialize screenshot carousel)
    =============================================== */
    
    $(".screenshots-carousel").owlCarousel({
 
        autoPlay: 3000, //Set AutoPlay to 3 seconds
 
        items : 5,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [979,3]
 
    });

});

$(window).load(function(){
    "use strict";
    
    /* ==============================================
    Isotope
    =============================================== */

        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            });
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({ 
                    filter: selector
                });
                return false;
            });

            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }


            if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.masonry-item'
              });
            });
        }

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var modal = document.getElementById('id01');
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}




