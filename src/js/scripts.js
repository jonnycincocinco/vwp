  initProductFinder(document.querySelector('.product-finder-container'));

  function initProductFinder(pf) {
    var slides = pf.querySelectorAll('.pf-slide');
    var dots = pf.querySelectorAll('.pf-dot');
    var featuredProductLinks = pf.querySelectorAll('.pf-featured-product');
    var currentSlideIndex = 0;

    var isMobile = function() {
      return window.innerWidth < 768;
    }

    var loop = setInterval(function() {
      if (currentSlideIndex === slides.length - 1) {
        changeSlideTo(0);
      } else {
        changeSlideBy(1);
      }
    }, 4000)

    pf.addEventListener('click', function() {
      clearInterval(loop);
    });
    forEachNode(featuredProductLinks, function(link) {
      link.addEventListener('mouseenter', function() {
        clearInterval(loop);
      });
    });

    forEachNode(slides, function(slide, i) {
      if (i === 0 && !isMobile()) slide.classList.add('pf-active');

      var outcome = slide.querySelector('.pf-business-outcome');
      outcome.addEventListener('click', function() {
        if (isMobile()) {
          slide.classList.toggle('pf-active');
        }
      });

      var useCases = slide.querySelectorAll('.pf-use-case');
      forEachNode(useCases, function(useCase, i) {
        if (i === 0 && !isMobile()) useCase.classList.add('pf-active');

        useCase.addEventListener('click', function() {
          if (isMobile()) {
            useCase.classList.toggle('pf-active');
          } else {
            forEachNode(useCases, function(useCase) {
              useCase.classList.remove('pf-active');
            });
            useCase.classList.add('pf-active');
          }
        });
      });
    });

    dots[0].classList.add('pf-active');

    forEachNode(dots, function (dot, i) {
      dot.addEventListener('click', function() {
        changeSlideTo(i)
      })
    })

    pf.querySelector('.pf-prev-arrow').addEventListener('click', function(event) {
      event.currentTarget.blur()
      changeSlideBy(-1);
    });

    pf.querySelector('.pf-next-arrow').addEventListener('click', function(event) {
      event.currentTarget.blur()
      changeSlideBy(1);
    });

    keepElementsAligned();

    function keepElementsAligned() {
      var pageWasLarge = [false];
      var elementsToClear = pf.querySelectorAll(
      '.pf-products, .pf-products-empty-area, .pf-slide, .product-finder, .pf-business-outcome'
      );

      alignElements(pageWasLarge, elementsToClear);
      window.addEventListener('load', function() {
        alignElements(pageWasLarge, elementsToClear);
      })
      window.addEventListener('resize', function() {
        alignElements(pageWasLarge, elementsToClear);
      });
    }

    function alignElements(pageWasLarge, elementsToClear) {
      if (window.innerWidth >= 768) {
        pageWasLarge[0] = true;
        equalHeights(pf.querySelectorAll('.pf-business-outcome'));
        equalHeights(
          pf.querySelectorAll('.pf-products'),
          pf.querySelectorAll('.pf-products-empty-area')
        );
        equalHeights(
          pf.querySelectorAll('.pf-slide'),
          pf.querySelectorAll('.product-finder')
        );
      } else if (pageWasLarge[0]) {
        forEachNode(elementsToClear, function(element) {
          element.style.height = '';
        });
      }

      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        var top = pf.querySelector('.pf-business-outcome').getBoundingClientRect().height;
        pf.querySelector('.pf-nav').style.top = top + 'px';
      } else {
        pf.querySelector('.pf-nav').style.top = '';
      }
    }

    function forEachNode(nodeList, fn) {
      return Array.prototype.forEach.call(nodeList, fn);
    }

    function changeSlideBy(n) {
      newSlideIndex = currentSlideIndex + n;
      changeSlideTo(newSlideIndex);
    }

    function changeSlideTo(newSlideIndex) {
      if (newSlideIndex >= 0 && newSlideIndex < slides.length) {
        slides[currentSlideIndex].classList.remove('pf-active');
        slides[newSlideIndex].classList.add('pf-active');
        dots[currentSlideIndex].classList.remove('pf-active');
        dots[newSlideIndex].classList.add('pf-active');
        currentSlideIndex = newSlideIndex;
      }
    }

    function equalHeights(measuredEls, resizedEls) {
      resizedEls = resizedEls || measuredEls;
      var tallest = 0;
      forEachNode(measuredEls, function(element) {
        element.style.height = '';
        var height = element.getBoundingClientRect().height;
        if (height > tallest) {
          tallest = height;
        }
      });
      forEachNode(resizedEls, function(element) {
        element.style.height = tallest + 'px';
      });
    }
  }

  $('.pf-video-poster, .pf-video-play-icon').click(function(){
    var videoOverlay = $(this).parent().children('.pf-video-overlay');
    videoOverlay.addClass('visible');
    $('body').css('overflow','hidden');
    var vidContainer = $('.pf-video-player-inner', videoOverlay);
    vidContainer.get(0).innerHTML = vidContainer.data('player-element');
    var vid = vidContainer.get(0).querySelector('video');
    bc(vid);
    videojs(vid).ready(function() {
      this.play();
    })
  });

  function closeOverlay(){
    $('.pf-video-overlay').removeClass('visible');
    $('body').css('overflow','auto');
    var thisVid = $(document).find('video');
    for (var i = 0; i < thisVid.get().length; i++) {
      thisVid.get([i]).pause();
    }
  }

  $('.pf-video-close-button').click(function(){
    closeOverlay();
  });

  $(document).keyup(function(e) {
     if (e.keyCode == 27) {
       closeOverlay();
    }
  });

  videojs.options.techOrder = ['html5','flash'];
