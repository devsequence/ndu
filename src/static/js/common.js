$(window).on('scroll', function () {
    var $this = $(this),
        $header = $('.header');
    if ($this.scrollTop() > 1) {
        $header.addClass('scroll-nav');
    } else {
        $header.removeClass('scroll-nav');
    }
});
function popupOpen() {
  var $popupButton = $('.btn-popup');
  $popupButton.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var popupButtonData = $this.data('popup');
      if($this.data('video-link')){
        $('.popup video').attr('src', $this.data('video-link'))
        $('.popup').removeClass('active');
        $('div[data-popup = '+popupButtonData+']').addClass('active');
        $('body').addClass('is-scroll');
      }else{
        $('.popup').removeClass('active');
        $('div[data-popup = '+popupButtonData+']').addClass('active');
        $('body').addClass('is-scroll');
      }
      
  });
}
popupOpen();
$('.popup-close').on('click', function (e) {
  var $this = $(this);
  $this.parent().parent().removeClass('active');
  $('.popup-overlay').removeClass('active');
  $('body').removeClass('is-scroll');
});
$('.popup-overlay').on('click', function (e) {
  var $this = $(this);
  $this.removeClass('active');
  $('.popup').removeClass('active');
  $('body').removeClass('is-scroll');
});
$('.header-btn').on('click', function (e) {
  e.preventDefault();
    $(this).toggleClass('active');
    $('.header').toggleClass('active');
    $('.menu-item-has-children').removeClass('active');
    $('.menu-item-has-children ul').slideUp();
    $('body').toggleClass('is-scroll');
});
function initMobileMenu() {
    const isMobile = $(window).width() <= 768;

    // скидаємо попередні хендлери
    $('.header-nav .menu-item-has-children > a').off('.mobileMenu');
    $(document).off('.mobileMenu');

    if (!isMobile) {
        // десктоп — повернути все як було
        $('.header-nav .menu-item-has-children').removeClass('active')
            .children('ul').removeAttr('style');
        return;
    }

    // мобільна поведінка
    $('.header-nav .menu-item-has-children > a').on('click.mobileMenu', function(e){
        e.preventDefault();
        e.stopPropagation();

        const $item = $(this).parent('.menu-item-has-children');
        const isOpen = $item.hasClass('active');

        if (isOpen) {
            // закриваємо поточний і ВСІ його нащадки
            $item.removeClass('active')
                .children('ul').stop(true, true).slideUp(250);
            $item.find('.menu-item-has-children').removeClass('active')
                .children('ul').stop(true, true).slideUp(250);
        } else {
            // закриваємо всіх СУСІДІВ і їх нащадків
            $item.siblings('.menu-item-has-children')
                .removeClass('active')
                .children('ul').stop(true, true).slideUp(250)
                .end()
                .find('.menu-item-has-children').removeClass('active')
                .children('ul').stop(true, true).slideUp(250);

            // відкриваємо поточний
            $item.addClass('active')
                .children('ul').stop(true, true).slideDown(250);
        }
    });

    // клік поза меню — закрити все
    $(document).on('click.mobileMenu', function(e){
        if (!$(e.target).closest('.header-nav').length) {
            $('.header-nav .menu-item-has-children').removeClass('active')
                .children('ul').stop(true, true).slideUp(250);
        }
    });
}

initMobileMenu();
$(window).on('resize', initMobileMenu);



$('.hero-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: true,
    arrows: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 2000,
});
$('.gallery-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    infinite: true,
    arrows: false,
    dots: true,
    responsive: [
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        }
    ]
});
(function(){
    const $slider = $('.gallery-slider');
    $slider.on('click', 'a[data-fancybox="media"]', function(e){
        e.preventDefault();
        const $clicked   = $(this).closest('.slick-slide');
        const realIndex  = $clicked.data('slick-index');

        const $anchors = $slider.find('.slick-slide:not(.slick-cloned) a[data-fancybox="media"]');
        const items = [];
        $anchors.each(function(){
            const $a    = $(this);
            const href  = $a.attr('href');
            const video = $a.data('video');
            const thumb = $a.find('img').attr('src') || '';

            if (video) {
                items.push({
                    src: video,
                    thumb: thumb
                });
            } else {
                items.push({
                    src: href,
                    type: 'image',
                    thumb: thumb
                });
            }
        });

        // знайти правильний startIndex у масиві без клонів
        let startIndex = 0;
        $anchors.each(function(i){
            if ($(this).closest('.slick-slide').data('slick-index') === realIndex) {
                startIndex = i;
                return false;
            }
        });

        Fancybox.show(items, {
            startIndex: startIndex,
            Thumbs: {
                autoStart: true
            },
            Toolbar: {
                display: {
                    left:   [],
                    middle: [],
                    right:  ['close']
                }
            },
            Html: { videoAutoplay: false }
        });
    });
})();
Fancybox.bind("[data-fancybox]", {});
$('.btn-search').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $form = $('.header-search-form');
    $form.toggleClass('active');
    $('.header, .header-btn').removeClass('active');
    if ($form.hasClass('active')) {
        setTimeout(() => {
            $form.find('.input-header-search').trigger('focus');
        }, 100);
    }
});
$(document).on('click', function(e) {
    const $target = $(e.target);
    if (!$target.closest('.header-search').length) {
        $('.header-search-form').removeClass('active');
    }
});
$(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
        $('.header-search-form').removeClass('active');
    }
});
// $('.header-lang, .catalog-level').on('click', function (e) {
//     const $this = $(this);
//     if($this.hasClass('active')){
//       $this.removeClass('active');
//     }else{
//       $this.addClass('active');
//     }
//   });
//   $(document).mouseup( function(e){
//     var div = $( ".header-lang, .catalog-level" );
//     if ( !div.is(e.target)
//         && div.has(e.target).length === 0 ) {
//       div.removeClass('active');
//     }
//   });
//
// // $('.header-btn').on('click', function (e) {
// //   e.preventDefault();
// //   const $this = $(this);
// //   $this.toggleClass('active');
// //   $('.header').toggleClass('active');
// // });
// $('.hero-nav a').on('click', function (e) {
//     e.preventDefault();
//     const $this = $(this);
//     const $thisItem = $this.attr('data-item');
//     $('.hero-item, .hero-nav a').removeClass('active');
//     $('div[data-item = '+$thisItem+']').addClass('active');
//     $this.addClass('active');
// });
// $('[data-advantages]').on('click', function (e) {
//   e.preventDefault();
//   const $this = $(this);
//   const dataValue = $this.attr('data-advantages');
//   $('.advantages-item, .advantages-number').removeClass('active');
//   $('[data-advantages="' + dataValue + '"]').addClass('active');
// });
//
// $('.faq-item__title').on('click', function (e) {
//   e.preventDefault();
//   const $item = $(this).closest('.faq-item');
//   const $itemText = $item.find('.faq-item__text');
//   if ($item.hasClass('active')) {
//     $item.removeClass('active');
//     $itemText.slideUp();
//   } else {
//     $('.faq-item').removeClass('active');
//     $('.faq-item__text').slideUp();
//     $item.addClass('active');
//     $itemText.slideDown();
//   }
// });

//
//
//
function checkVisibleBlocks() {
  $('[data-asb]').each(function () {
    var $el = $(this);
    if ($el.hasClass('visible')) return;

    var windowBottom = $(window).scrollTop() + $(window).height();
    var elementTop = $el.offset().top;

    if (elementTop < windowBottom - 80) {
      var delayStep = parseInt($el.data('asb-delay')) || 0;
      var delayTime = delayStep * 200;
      if (window.innerWidth < 768) {
        delayTime = 0;
        $el.css('transition-delay', '0s');
      } else {
        $el.css('transition-delay', (delayTime / 1000) + 's');
      }

      setTimeout(function () {
        $el.addClass('visible');
        $el.one('transitionend webkitTransitionEnd oTransitionEnd', function () {
          setTimeout(function () {
            $el.addClass('abs');
          }, 800);
        });
      }, delayTime);
    }
  });
}


$(window).on('scroll load', checkVisibleBlocks);

// $(function () {
//   const animatedItems = $(".numbers-item__numb");
//   const animatedClass = "animated";
//
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const $el = $(entry.target);
//         if (!$el.hasClass(animatedClass)) {
//           animateNumber($el);
//           $el.addClass(animatedClass);
//         }
//       }
//     });
//   }, {
//     threshold: 0.5
//   });
//
//   animatedItems.each(function () {
//     observer.observe(this);
//   });
//
//   function animateNumber($el) {
//     const target = parseInt($el.data("numb"));
//     const $span = $el.find("span");
//     $({ count: 0 }).animate({ count: target }, {
//       duration: 1500,
//       easing: "swing",
//       step: function () {
//         $span.text(Math.floor(this.count));
//       },
//       complete: function () {
//         $span.text(target);
//       }
//     });
//   }
// });
//
//
// const swiperInstances = {};
//
//   function initSwiper(tabId) {
//     if (!swiperInstances[tabId]) {
//       const $container = $(`.project-item[data-tab="${tabId}"] .project-slider`);
//       const containerEl = $container[0];
//
//       swiperInstances[tabId] = new Swiper(containerEl, {
//         slidesPerView: 'auto',
//         spaceBetween: 10,
//         loop: true,
//         navigation: {
//           nextEl: $container.find(".next")[0],
//           prevEl: $container.find(".prev")[0],
//         },
//       });
//     }
//   }
//
//   $(document).ready(function () {
//     initSwiper("project-1");
//     $(".project-nav a").on("click", function (e) {
//       e.preventDefault();
//       const target = $(this).data("tab");
//       $(".project-nav a").removeClass("active");
//       $(this).addClass("active");
//       $(".project-item").removeClass("active").hide();
//       $(`.project-item[data-tab="${target}"]`).addClass("active").fadeIn(200);
//       initSwiper(target);
//     });
//
//     // 3. Fancybox
//     Fancybox.bind("[data-fancybox]", {});
//   });
// $('.brands-slider').slick({
//   infinite: true,
//   slidesToShow: 5,
//   slidesToScroll: 1,
//   prevArrow: $('.brands-prev'),
//   nextArrow: $('.brands-next'),
// });
// $('.project-slider').slick({
//   infinite: true,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   prevArrow: $('.project-prev'),
//   nextArrow: $('.project-next'),
//   responsive: [
//     {
//       breakpoint: 769,
//       settings: {
//         variableWidth: true,
//         infinite: true,
//       }
//     },
//   ]
// });

// $('.product-reviewed-slider').slick({
//   infinite: false,
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   prevArrow: $('.product-reviewed-prev'),
//   nextArrow: $('.product-reviewed-next'),
// });
// $('.hero-slider').slick({
//   infinite: true,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows:false,
//   dots:true,
// });
// $('.reviews-slider').slick({
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   prevArrow: $('.reviews-prev'),
//   nextArrow: $('.reviews-next'),
// });
// $('.product-item__wish').on('click', function (e){
//   e.preventDefault();
//   $(this).toggleClass('active');
// })
// var testimonialsSwiper = new Swiper(".testimonials-slider", {
//   slidesPerView: 3,
//   spaceBetween: 24,
//   loop: true,
//   navigation: {
//     nextEl: '.testimonials .next',
//     prevEl: '.testimonials .prev',
//   },
//   breakpoints: {
//     0: {
//       slidesPerView: 1,
//     },
//     768: {
//       slidesPerView: 3,
//     }
//   }
// });
//
// $(function () {
//   const video = $(".video").get(0);
//   $(".video-btn").click(function () {
//     if (video.paused) {
//       video.play();
//       $(".video").prop('controls', true);
//       $(".video-btn").css('opacity', '0')
//     } else {
//       video.pause();
//       $(".video").prop('controls', false);
//       $(".video-btn").css('opacity', '1');
//     }
//   });
// });
//
// $('.calculator-item__radio').on('click', function () {
//   const $ths = $(this);
//   const labelMedia = $ths.find('label').data('calculator-media');
//   const $calculatorMedia = $ths.closest('.calculator-item__desc')
//     .siblings('.calculator-item__media')
//     .find('img');
//
//   if (labelMedia && $calculatorMedia.attr('src') !== labelMedia) {
//     $calculatorMedia.fadeOut(200, function () {
//       $calculatorMedia.attr('src', labelMedia).on('load', function () {
//         $(this).fadeIn(200);
//       });
//     });
//   }
// });
//
// function updateCircularProgress(percent) {
//   const circle = document.querySelector('.progress-line');
//   const dot = document.querySelector('.progress-dot');
//   const percentText = document.querySelector('.calculator-progress__percent');
//
//   const radius = 48.5;
//   const cx = 51.5;
//   const cy = 51.5;
//   const circumference = 2 * Math.PI * radius;
//
//   circle.style.strokeDasharray = `${circumference}`;
//   circle.style.strokeDashoffset = `${circumference - (percent / 100) * circumference}`;
//
//   const totalStep = document.querySelectorAll('.calculator-item').length;
//   const offsetStep = 100 / (totalStep - 1);
//   const dotPercent = Math.min(percent + offsetStep, 100);
//
//   const angleDeg = (dotPercent / 100) * 360;
//   const angleRad = (angleDeg - 90) * (Math.PI / 180);
//   const x = cx + radius * Math.cos(angleRad);
//   const y = cy + radius * Math.sin(angleRad);
//
//   dot.setAttribute('cx', x);
//   dot.setAttribute('cy', y);
//   percentText.textContent = `${percent}%`;
// }
//
// // Оновлення кроків
// function updateStepCounter() {
//   const totalStep = $('.calculator-item').length;
//   const $active = $('.calculator-item.active');
//   const curentStep = parseInt($active.data('calculator'), 10);
//
//   const percent = Math.round(((curentStep - 1) / (totalStep - 1)) * 100);
//   $('.step-curent').text(curentStep);
//   $('.step-total').text(totalStep);
//
//   updateCircularProgress(percent);
// }
//
// // Перехід на наступний крок
// $('.calculator-inner .next-calculator').on('click', function (e) {
//   e.preventDefault();
//   const $current = $('.calculator-item.active');
//   const $next = $current.next('.calculator-item');
//
//   // Знаходимо всі input'и всередині поточного кроку
//   const $requiredInputs = $current.find('input[required], input[type="text"], input[type="radio"]:required');
//
//   let isValid = true;
//
//   $requiredInputs.each(function () {
//     const $input = $(this);
//
//     // Для текстових полів
//     if ($input.attr('type') === 'text' && !$input.val().trim()) {
//       isValid = false;
//       $input.addClass('input-error'); // для стилізації помилки
//     }
//
//     // Для radio-поля — перевірити, чи хоча б один із групи вибраний
//     if ($input.attr('type') === 'radio') {
//       const name = $input.attr('name');
//       if (!$current.find(`input[name="${name}"]:checked`).length) {
//         isValid = false;
//         $current.find(`input[name="${name}"]`).addClass('input-error');
//       }
//     }
//   });
//
//   if (!isValid) {
//     return; // зупиняємо перехід
//   }
//
//   if ($next.length) {
//     $current.removeClass('active');
//     $next.addClass('active');
//     updateStepCounter();
//   }else{
//     $('.calculator-inner').addClass('calculator-form');
//     $('.calculator-progress').addClass('hidden');
//     $('.calculator-result').addClass('active');
//   }
// });
//
// $('input').on('input change focus', function () {
//   $(this).removeClass('input-error');
// });
//
// // Перехід на попередній крок
// $('.calculator-inner .prev-calculator').on('click', function (e) {
//   e.preventDefault();
//   const $current = $('.calculator-item.active');
//   const $prev = $current.prev('.calculator-item');
//
//   if ($prev.length) {
//     $current.removeClass('active');
//     $prev.addClass('active');
//     updateStepCounter();
//   }
// });
//
// $(document).ready(function () {
//   if($('.calculator-inner').length){
//     updateStepCounter();
//   }
//
// });
//
// $('.calculator-result__info .prev-calculator').on('click', function(e){
//   e.preventDefault();
//   $('.calculator-inner').removeClass('calculator-form');
//   $('.calculator-progress').removeClass('hidden');
//   $('.calculator-result').removeClass('active');
//   $('.calculator-total__form').removeClass('active');
//   $('.calculator-total__info').removeClass('hide-info');
// })
// $('.calculator-total__button').on('click', function(e){
//   e.preventDefault();
//   $('.calculator-total__form').addClass('active');
//   $('.calculator-total__info').addClass('hide-info');
//
//
// })
// $('input.number').on('input', function () {
//   const $input = $(this);
//   const info = $input.data('number-info') || '';
//   const min = parseInt($input.attr('min'), 10) || 0;
//   let digits = $input.val().replace(/\D/g, '');
//   if (digits && parseInt(digits, 10) < min) {}
//   const numberValue = digits ? parseInt(digits, 10) : '';
//   const formatted = numberValue ? `від ${numberValue} ${info}` : '';
//   $input.val(formatted);
//   const prefixLength = 'від '.length;
//   const cursorPos = prefixLength + digits.length;
//   this.setSelectionRange(cursorPos, cursorPos);
// });
// $('input.number').on('blur', function () {
//   const $input = $(this);
//   const info = $input.data('number-info') || '';
//   const min = parseInt($input.attr('min'), 10) || 0;
//   const digits = $input.val().replace(/\D/g, '');
//   const numberValue = parseInt(digits, 10);
//   if (numberValue < min) {
//     $input.val(`від ${min} ${info}`);
//   }
// });
// $('.calculator-form').on('submit', function(){
//   e.preventDefault();
//   $('.calculator-form').addClass('hidden-form');
//   $('.calculator-sucsess').addClass('active');
// });
//
// function isMobile() {
//   return window.innerWidth <= 768;
// }
//
// if (isMobile()) {
//   var $items = $('.hero-item');
//   var current = 0;
//
//   function cycleHeroItems() {
//     $items.removeClass('active');
//     $items.eq(current).addClass('active');
//     current = (current + 1) % $items.length;
//   }
//
//   // Початковий запуск
//   cycleHeroItems();
//
//   // Кожні 4 секунди
//   setInterval(cycleHeroItems, 4000);
// }