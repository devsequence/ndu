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
  var $popupButton = $('.btn-popup, .team-item__link a');
  $popupButton.on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      var popupType = $this.data('popup');
      var $popup = $('div[data-popup="' + popupType + '"]');
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
      if (popupType === 'team') {
          const $teamItem = $this.closest('.team-item');
          const name = $teamItem.find('.team-item__title').text().trim();
          const info = $teamItem.find('.team-item__desc').data('info');
          const mediaHtml = $teamItem.find('.team-item__media').html();
          // Очищаємо попередній контент
          $popup.find('.popup-title').text(name);
          $popup.find('.popup-team__media').html(mediaHtml);
          $popup.find('.popup-team__desc').html(info);
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
$('.team-slider').slick({
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
                slidesToShow: 1,
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
$('.read-more').on('click', function (e) {
    e.preventDefault();
    $(this).find('span').toggleClass('hidden');
    $(this).parents('.section-link').prev().toggleClass('active');
});
$(function () {
    const $nav      = $(".program-sidebar__nav");
    const $list     = $nav.find("ul");
    const $sections = $(".program-inner");
    const $header   = $("header");
    const GAP       = 30;

    // 1) Динамічна висота хедера -> sticky top
    function headerH() { return $header.outerHeight() || 0; }
    function setStickyTop() { $nav.css("top", headerH() + 10); }

    // 2) Якщо список пустий — згенеруємо навігацію з заголовків секцій
    function ensureNav() {
        $sections.each(function () {
            const $s = $(this);
            const title = $.trim($s.find(".program-inner__title").text());
            const id = $s.data("id");
            console.log('sdd');
            if (title && id) {
                $list.append(
                    $('<li><a href="#">'+title+'</a></li>')
                        .find("a")
                        .attr("data-scroll", id)
                        .end()
                );
            }
        });
    }

    function scrollToSection(id) {
        const $t = $sections.filter('[data-id="' + id + '"]');
        if (!$t.length) return;
        const y = $t.offset().top - headerH() - GAP;
        $("html, body").stop().animate({ scrollTop: y }, 500);
    }

    function setActive(id) {
        $list.find("a").removeClass("active");
        $list.find('a[data-scroll="' + id + '"]').addClass("active");
        $sections.removeClass("active");
        $sections.filter('[data-id="' + id + '"]').addClass("active");
    }

    function setActiveByScroll() {
        const h = headerH();
        const st = $(window).scrollTop();
        let currentId = null;

        $sections.each(function () {
            const $s = $(this);
            const top = $s.offset().top - h - 30; // трохи запасу
            if (st >= top) currentId = $s.data("id");
        });

        if (currentId) setActive(currentId);
    }

    $list.on("click", "a", function (e) {
        e.preventDefault();
        const id = $(this).data("scroll");
        setActive(id);
        scrollToSection(id);
    });

    let ticking = false;
    $(window).on("scroll", function () {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(function () {
                setActiveByScroll();
                ticking = false;
            });
        }
    });

    $(window).on("resize", function () {
        setStickyTop();
        setActiveByScroll();
    });

    ensureNav();
    setStickyTop();
    setActiveByScroll();
    setTimeout(setStickyTop, 300);
});
window.initMap = function () {
    const el = document.querySelector('.map');
    if (!el) return;

    // зчитуємо й перетворюємо значення
    const zoomAttr = el.getAttribute('data-map-zoom');
    const latAttr  = el.getAttribute('data-map-lat');
    const lngAttr  = el.getAttribute('data-map-lng');
    const iconUrl  = el.getAttribute('data-map-pin') || null;

    const zoom = Number.parseInt(zoomAttr, 10);
    const lat  = Number.parseFloat(latAttr);
    const lng  = Number.parseFloat(lngAttr);

    const isFiniteNum = n => typeof n === 'number' && Number.isFinite(n);
    if (!isFiniteNum(lat) || !isFiniteNum(lng)) {
        console.error('Invalid lat/lng in data-attributes:', { lat: latAttr, lng: lngAttr });
        return;
    }

    const position = { lat, lng };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: isFiniteNum(zoom) ? zoom : 12,
        center: position,
        disableDefaultUI: true
    });
    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        let contentEl = null;

        if (iconUrl) {
            contentEl = document.createElement('img');
            contentEl.src = iconUrl;
            contentEl.alt = 'Pin';
            contentEl.style.width = '32px';
            contentEl.style.height = '32px';
            contentEl.style.transform = 'translate(-50%, -100%)';
        }

        new google.maps.marker.AdvancedMarkerElement({
            map,
            position,
            ...(contentEl ? { content: contentEl } : {})
        });

    } else {
        new google.maps.Marker({
            map,
            position,
            ...(iconUrl ? { icon: iconUrl } : {})
        });
    }
};
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
if($('.about-numbers').length > 0){
    $(function() {
        const $numbersBlock = $('.about-numbers');
        const $counters = $numbersBlock.find('.about-number__number');
        let started = false;
        function animateCounter($el) {
            const target = parseInt($el.data('number'), 10);
            const duration = 1500; // 1.5s
            const stepTime = 20;
            const steps = Math.ceil(duration / stepTime);
            let current = 0;

            const timer = setInterval(() => {
                current += target / steps;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                $el.contents().filter(function() {
                    return this.nodeType === 3; // тільки текст (без span)
                }).first().replaceWith(Math.floor(current));
            }, stepTime);
        }

        function isVisible($el) {
            const rect = $el[0].getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return rect.top <= windowHeight * 0.9 && rect.bottom >= 0;
        }
        function checkAndAnimate() {
            if (!started && isVisible($numbersBlock)) {
                started = true;
                $counters.each(function() {
                    animateCounter($(this));
                });
            }
        }
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !started) {
                        started = true;
                        $counters.each(function() {
                            animateCounter($(this));
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            observer.observe($numbersBlock[0]);
        } else {
            $(window).on('scroll resize load', checkAndAnimate);
        }
    });
}
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
$(document).ready(function() {
    const bookedDates = [];
    const daysToHighlight = [];
    const testDaysToHighlight = [];
    $('.item').each(function() {
        const dateItems = $(this).find('.item-list li.date-item span:last-child'); // Збираємо всі елементи з датами
        dateItems.each(function() {
            const dateText = $(this).text().trim();
            const dateMatch = dateText.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/);
            const dateMatchTest = dateMatch.input;
            testDaysToHighlight.push({
                dateMatchTest
            });
            if (dateMatch) {
                const startDate = new Date(dateMatch[1]);
                const endDate = new Date(dateMatch[2]);
                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    daysToHighlight.push({
                        day: d.getDate(),
                        month: d.getMonth(),
                        year: d.getFullYear(),
                    });

                }

            }
        });

    });
    console.log(testDaysToHighlight);


    const tour_id = localStorage.getItem('tour_id');
    const tour_name = localStorage.getItem('tour_title');
    $('.tour_id').val(tour_id);
    $('.tour_name').val(tour_name);

    let startDate = null;
    let endDate = null;
    const dateRanges = $.map(testDaysToHighlight, function(obj) {
        return obj.dateMatchTest;
    });
    function updateCalendars() {
        $('#current-month').html(renderCalendar(0));
        $('#next-month').html(renderCalendar(1));
        attachDayClickEvent();
        autoSelectDays();
        processTourDates(dateRanges);
    }

    function fetchBookedDates(tourId) {
        $.ajax({
            url: `/wp-admin/admin-ajax.php?action=get_booked_dates&tour_id=${tourId}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    bookedDates.length = 0;
                    bookedDates.push(...data.data.booked_dates.map(date => new Date(date + 'T00:00:00Z').toISOString().split('T')[0]));
                    updateCalendars();
                }
            },
            error: function(error) {
                console.error('Помилка:', error);
            }
        });
    }

    function fetchBikeBookedDates(tourId) {
        $.ajax({
            url: `/wp-admin/admin-ajax.php?action=get_booked_dates_moto&tour_bike_id=${tourId}`,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    bookedDates.push(...data.data.booked_dates);
                    updateCalendars();
                } else {
                    console.log('Не вдалося отримати заброньовані дати:', data);
                }
            },
            error: function(error) {
                console.error('Помилка:', error);
            }
        });
    }

    const tourIdFromStorage = localStorage.getItem('tour_id');
    if (tourIdFromStorage) {
        fetchBookedDates(tourIdFromStorage);
        fetchBikeBookedDates(tourIdFromStorage);
    }

    $('select[name="tour_id"]').change(function() {
        const selectedTourId = $(this).val();
        localStorage.setItem('tour_id', selectedTourId);

        if (selectedTourId) {
            fetchBookedDates(selectedTourId);
            fetchBikeBookedDates(selectedTourId);
        }
    });

    let currentDate = new Date();
    // const cookiepLanguage = Cookies.get('pll_language');
    let months, weekdays;
    months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
    // if (cookiepLanguage === 'tr') {
    //     months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    //     weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
    // } else if (cookiepLanguage === 'ru') {
    //     months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    //     weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    // } else {
    //     months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // }

    function isPastDate(date) {
        return date < new Date();
    }



    function renderCalendar(monthOffset) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
        const monthName = months[monthDate.getMonth()];
        const year = monthDate.getFullYear();
        let daysInMonth = new Date(year, monthDate.getMonth() + 1, 0).getDate();
        let firstDay = new Date(year, monthDate.getMonth(), 1).getDay();
        let calendarHtml = `<h5>${monthName} ${year}</h5>`;

        calendarHtml += '<div class="weekdays">';
        weekdays.forEach(day => {
            calendarHtml += `<div class="weekday">${day}</div>`;
        });
        calendarHtml += '</div>';

        calendarHtml += '<div class="days">';
        for (let i = 0; i < firstDay; i++) {
            calendarHtml += '<div class="day empty"></div>';
        }

        // Створюємо календар з виділеними днями турів
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDate = new Date(year, monthDate.getMonth(), day);
            const isDisabled = isPastDate(dayDate) ? 'disabled' : '';
            const formattedDate = dayDate.toISOString().split('T')[0];
            const isBooked = bookedDates.includes(formattedDate) ? 'booked' : '';

            // Перевірка, чи день є туровою датою
            const isTourDate = daysToHighlight.some(({ day: highlightDay, month: highlightMonth, year: highlightYear }) => {
                return highlightDay === day && highlightMonth === monthDate.getMonth() && highlightYear === year;
            });


            const tourDateClass = isTourDate ? 'tour-date' : '';
            calendarHtml += `<div class="day ${isDisabled} ${tourDateClass}" data-day="${day}" data-month="${monthDate.getMonth()}" data-year="${year}">${day}</div>`;
        }

        calendarHtml += '</div>';
        return calendarHtml;
    }
    function attachDayClickEvent() {
        $('.day').off('click').click(function() {
            if ($('.calendar').hasClass('tour')) {
                return;
            }
            if (!$(this).hasClass('empty') && !$(this).hasClass('disabled') && !$(this).hasClass('booked') ) {
                const day = parseInt($(this).data('day'));
                const month = parseInt($(this).data('month'));
                const year = parseInt($(this).data('year'));

                const selectedDate = new Date(year, month, day);
                const yyyy = selectedDate.getFullYear();
                const mm   = String(selectedDate.getMonth() + 1).padStart(2, '0');
                const dd   = String(selectedDate.getDate()).padStart(2, '0');
                const formattedDate = `${yyyy}-${mm}-${dd}`;
                $.ajax({
                    url: '/wp-admin/admin-ajax.php',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        action: 'get_tours_for_date',
                        selected_date: formattedDate
                    },
                    success: function(response) {
                        console.log('AJAX response:', response);
                        if (response.success) {
                            $('#tour-items').html(response.data.html);
                        } else {
                            loadAllTours();
                            // $('#tour-items').html(`<p>${response.data.message || 'No tours available'}</p>`);
                        }
                    },

                    error: function(xhr) {
                        console.log('AJAX error:', xhr.status, xhr.responseText);
                        // $('#tour-items').html('<p>An error occurred. Please try again.</p>');
                        loadAllTours();
                        console.log(selectedDate);
                    }
                });

                if (!startDate) {
                    startDate = selectedDate;
                    // $('input[name="order_start"]').val(startDate.toISOString().split('T')[0]);
                    // $('#start-date-display').text(startDate.toLocaleDateString('uk-UA'));

                    // $(this).addClass('selected last-selected');
                    // $('.tour-desc__date p:nth-child(1)').text(selectedDate);
                    // autoSelectDays();

                } else if (startDate && !endDate && selectedDate > startDate) {
                    endDate = selectedDate;
                    // $('input[name="order_end"]').val(endDate.toISOString().split('T')[0]);
                    // $('#end-date-display').text(endDate.toLocaleDateString('uk-UA'));
                    // highlightRange(startDate, endDate);
                    // $(this).addClass('last-selected');
                    // $('.link-section .btn-red').addClass('active');
                    // $('.tour-desc__date p:nth-child(2)').text(selectedDate);

                } else {
                    resetSelection();
                }
            }

        });

    }
    function loadAllTours() {
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'GET',
            dataType: 'json',
            data: {
                action: 'get_oneday_tours'
            },
            success: function (response) {
                console.log('Default tours fallback:', response);
                if (response.success) {
                    $('#tour-items').html(response.data.html);
                } else {
                    $('#tour-items').html('<p>Немає доступних турів.</p>');
                }
            },
            error: function (xhr) {
                $('#tour-items').html('<p>Помилка при завантаженні турів.</p>');
            }
        });
    }


    function highlightRange(start, end) {
        $('.day').removeClass('range');
        const startDay = start.getDate();
        const endDay = end.getDate();
        const startMonth = start.getMonth();
        const endMonth = end.getMonth();
        const year = start.getFullYear();
        for (let month = startMonth; month <= endMonth; month++) {
            let startDayInRange = month === startMonth ? startDay : 1;
            let endDayInRange = month === endMonth ? endDay : new Date(year, month + 1, 0).getDate();
            for (let day = startDayInRange; day <= endDayInRange; day++) {
                $(`.day[data-day="${day}"][data-month="${month}"][data-year="${year}"]`).addClass('range');
            }
        }
    }

    function resetSelection() {
        startDate = null;
        endDate = null;
        $('#start-date-display').text('Немає');
        $('#end-date-display').text('Немає');
        $('.day').removeClass('selected range last-selected');
    }

    function autoSelectDays() {
        const daysBike = parseInt($('#daysBike').val());
        if (daysBike > 0 && startDate) {
            const newEndDate = new Date(startDate);
            newEndDate.setDate(startDate.getDate() + daysBike - 1);
            endDate = newEndDate;
            $('#end-date-display').text(endDate.toLocaleDateString('uk-UA'));
            highlightRange(startDate, endDate);
            $('.day[data-day="' + endDate.getDate() + '"][data-month="' + endDate.getMonth() + '"][data-year="' + endDate.getFullYear() + '"]').addClass('last-selected');
        }
    }

    $('#prev').click(function() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendars();
        resetSelection();
        processTourDates(dateRanges);
    });

    $('#next').click(function() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendars();
        resetSelection();
        processTourDates(dateRanges);
    });

    updateCalendars();

    $(document).on('click', '.tour-desc__list li', function() {
        const dateSpans = $(this).find('span:last-child span');
        const dates = [];
        dateSpans.each(function() {
            dates.push($(this).text().trim());
        });
        if (dates.length === 2) {
            startDate = new Date(dates[0]);
            endDate = new Date(dates[1]);
            $('input[name="order_start"]').val(startDate.toISOString().split('T')[0]);
            $('input[name="order_end"]').val(endDate.toISOString().split('T')[0]);
            currentDate.setFullYear(startDate.getFullYear());
            currentDate.setMonth(startDate.getMonth());
            updateCalendars();
        } else {
            console.error('Неправильний формат дат');
        }
        $('.day').removeClass('selected last-selected range');
        highlightRange(startDate, endDate);
    });
    function fetchToursForDates() {
        if (!startDate || !endDate) {
            console.log('Please select both start and end dates.');
            return;
        }
        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            method: 'GET',
            data: {
                action: 'get_tours_for_dates',
                start_date: startDate,
                end_date: endDate
            },
            success: function (response) {
                if (response.success) {
                    const bookedDates = response.data.booked_dates;

                    $('.day').removeClass('selected range last-selected');

                    console.log(bookedDates);
                    bookedDates.forEach((date, index) => {
                        const dayElement = $(`.day[data-date="${date}"]`);
                        if (index === 0) {
                            dayElement.addClass('selected range');
                        } else if (index === bookedDates.length - 1) {
                            dayElement.addClass('last-selected range');
                        } else {
                            dayElement.addClass('range');
                        }
                    });

                    // Показати результат
                    $('#tour-results').html(response.data.html);
                } else {
                    $('#tour-results').html('<p>Error fetching tours.</p>');
                }
            },
            error: function () {
                $('#tour-results').html('<p>An error occurred. Please try again.</p>');
            }
        });
    }




    function processTourDates(dateRanges) {
        dateRanges.forEach(range => {
            const [startDateStr, endDateStr] = range.match(/^(\d{4}-\d{2}-\d{2})\s*-\s*(\d{4}-\d{2}-\d{2})$/).slice(1);
            const startDate = new Date(startDateStr);
            const endDate = new Date(endDateStr);
            const startDayElement = document.querySelector(
                `.day[data-day="${startDate.getDate()}"][data-month="${startDate.getMonth()}"][data-year="${startDate.getFullYear()}"]`
            );
            if (startDayElement) {
                startDayElement.classList.add('start-tour', 'tour-date');
            }
            const endDayElement = document.querySelector(
                `.day[data-day="${endDate.getDate()}"][data-month="${endDate.getMonth()}"][data-year="${endDate.getFullYear()}"]`
            );
            if (endDayElement) {
                endDayElement.classList.add('end-tour', 'tour-date');
            }

            // Виділяємо всі дні між початком і кінцем
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dayElement = document.querySelector(
                    `.day[data-day="${d.getDate()}"][data-month="${d.getMonth()}"][data-year="${d.getFullYear()}"]`
                );
                if (dayElement && !dayElement.classList.contains('start-tour') && !dayElement.classList.contains('end-tour')) {
                    dayElement.classList.add('tour-date');
                }
            }
        });
    }
    setTimeout(function() {
        processTourDates(dateRanges);
    }, 1200);

});
$(".btn-reset-caledar").on("click", function(e) {
    if($(this).attr('href') === '#'){
        e.preventDefault();
        var $allDays = $(".day");
        $allDays.removeClass("selected last-selected range thitem");

        const heightHeader = $('.header').height() + 100;

        $('html, body').animate({
            scrollTop: $('#tour-items').offset().top - heightHeader
        }, 800);

        $.ajax({
            url: '/wp-admin/admin-ajax.php',
            type: 'POST',
            data: {
                action: 'load_all_posts',
            },
            success: function(response) {
                $('#tour-items').html(response);
            },
            error: function() {
                console.log('Помилка при завантаженні постів');
            }
        });

    }
});
// $(document).on('click', '.day', function () {
//     var $allDays = $(".day");
//     var $clickedDay = $(this);

//     $allDays.removeClass("selected last-selected range");

//     var clickedIndex = $allDays.index($clickedDay);
//     var $closestStartTour = $allDays.slice(0, clickedIndex + 1).filter(".start-tour").last();
//     var $closestEndTour = $allDays.slice(clickedIndex).filter(".end-tour").first();
//     if ($closestStartTour.length && $closestEndTour.length) {
//         var startIndex = $allDays.index($closestStartTour);
//         var endIndex = $allDays.index($closestEndTour);
//         $allDays.slice(startIndex, endIndex + 1).addClass("range");
//         $closestStartTour.addClass("selected");
//         $closestEndTour.addClass("last-selected");
//     }
//     else if($clickedDay.hasClass('end-tour start-tour')){
//         var startIndex = $allDays.index($closestStartTour);
//         var endIndex = $allDays.index($closestEndTour);
//         $allDays.slice(startIndex, endIndex + 1).addClass("range");
//         $closestStartTour.addClass("selected");
//         $closestEndTour.addClass("last-selected");
//     }
//     const heightHeader = $('.header').height() + 100;
//     $('html, body').animate({
//         scrollTop: $('#tour-items').offset().top - heightHeader
//     }, 800);
// });


$(document).on('click', '.day', function () {
    var $allDays = $(".day");
    var $clickedDay = $(this);
    $allDays.removeClass("selected last-selected range");
    if ($clickedDay.hasClass('start-tour') || $clickedDay.hasClass('end-tour')) {}else{
        if ($clickedDay.hasClass('start-tour') && $clickedDay.hasClass('end-tour')) {
            // var clickedIndex = $allDays.index($clickedDay);
            // var $closestStartTour = $allDays.slice(0, clickedIndex).filter(".start-tour").last();
            // var $closestEndTour = $allDays.slice(clickedIndex).filter(".end-tour").last();
            // if ($closestStartTour.length && $closestEndTour.length) {
            //     var startIndex = $allDays.index($closestStartTour);
            //     var endIndex = $allDays.index($closestEndTour);
            //     $allDays.slice(startIndex, endIndex + 1).addClass("range");
            //     $closestStartTour.addClass("selected");
            //     $closestEndTour.addClass("last-selected");

            // }
        } else {
            // var clickedIndex = $allDays.index($clickedDay);
            // var $closestStartTour = $allDays.slice(0, clickedIndex + 1).filter(".start-tour").last();
            // var $closestEndTour = $allDays.slice(clickedIndex).filter(".end-tour").first();

            // if ($closestStartTour.length && $closestEndTour.length) {
            //     var startIndex = $allDays.index($closestStartTour);
            //     var endIndex = $allDays.index($closestEndTour);
            //     $allDays.slice(startIndex, endIndex + 1).addClass("range");
            //     $closestStartTour.addClass("selected");
            //     $closestEndTour.addClass("last-selected");
            // }
        }
    }


    const heightHeader = $('.header').height() + 100;
    $('html, body').animate({
        scrollTop: $('#tour-items').offset().top - heightHeader
    }, 800);
});


