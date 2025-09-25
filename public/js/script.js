// Main JavaScript for Showcase Hotel Kasane
$(document).ready(function() {
    
    // Loading animation
    setTimeout(function() {
        $('#loading').fadeOut(1000);
    }, 2000);
    
    // Drawer menu
    $('#js-drawer').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Drawer icon clicked');
        
        const $drawerIcon = $(this);
        const $drawerBg = $('.drawer-bg');
        
        // アニメーションの状態を確認
        const isActive = $drawerIcon.hasClass('active');
        
        if (isActive) {
            // メニューを閉じる
            $drawerBg.removeClass('is-active');
            $drawerIcon.removeClass('active');
            console.log('Closing drawer menu');
        } else {
            // メニューを開く
            $drawerIcon.addClass('active');
            // 少し遅延させてアイコンのアニメーションを先に実行
            setTimeout(function() {
                $drawerBg.addClass('is-active');
            }, 150);
            console.log('Opening drawer menu');
        }
    });
    
    $('.drawer-bg').click(function(e) {
        if (e.target === this) {
            console.log('Drawer background clicked');
            closeDrawerMenu();
        }
    });
    
    // Close drawer when clicking on links
    $('.drawer__links a').click(function() {
        console.log('Drawer link clicked');
        closeDrawerMenu();
    });
    
    // ドロワーメニューを閉じる関数
    function closeDrawerMenu() {
        $('.drawer-bg').removeClass('is-active');
        $('#js-drawer').removeClass('active');
    }
    
    // WOW.js initialization
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Swiper initialization
    console.log('Swiper available:', typeof Swiper !== 'undefined');
    
    // Swiper初期化を遅延実行
    setTimeout(function() {
        if (typeof Swiper !== 'undefined') {
            console.log('Initializing Swiper...');
            const conceptSwiper = new Swiper('.swiper-concept', {
                loop: true,
                // 自動スクロールを無効化
                autoplay: false,
                pagination: {
                    el: '.swiper-concept__pagination',
                    clickable: false, // クリック機能を無効化
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                slidesPerView: 1,
                spaceBetween: 30,
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                },
                on: {
                    init: function () {
                        console.log('Swiper initialized successfully');
                    },
                    slideChange: function () {
                        console.log('Slide changed');
                    }
                }
            });
        } else {
            console.error('Swiper is not loaded');
        }
    }, 1000);
    
    // Modal functionality
    $('.modal-open').click(function() {
        $(this).next('.s-column4__modal--base').fadeIn();
    });
    
    $('.modal-close').click(function() {
        $(this).fadeOut();
    });
    
    // BGM functionality
    const audio = document.getElementById('js-audio');
    const bgmButton = document.getElementById('js-bgm');
    let isPlaying = false;
    
    if (audio && bgmButton) {
        bgmButton.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                bgmButton.classList.remove('playing');
                isPlaying = false;
            } else {
                audio.play();
                bgmButton.classList.add('playing');
                isPlaying = true;
            }
        });
    }
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });
    
    // Form validation
    $('form').submit(function(e) {
        const name = $('#yourName').val();
        const email = $('#yourEmail').val();
        const message = $('#yourMessage').val();
        const check = $('input[name="check"]').is(':checked');
        
        if (!name || !email || !message || !check) {
            e.preventDefault();
            alert('すべての項目を入力し、チェックボックスにチェックを入れてください。');
            return false;
        }
    });
    
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.header').addClass('scrolled');
            $('#js-drawer').addClass('is-color');
        } else {
            $('.header').removeClass('scrolled');
            $('#js-drawer').removeClass('is-color');
        }
    });
    
    // Reservation button scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('.reservation-btn').addClass('visible');
        } else {
            $('.reservation-btn').removeClass('visible');
        }
    });
    
    // Image lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.drawer-icon, .drawer-bg').length) {
            closeDrawerMenu();
        }
    });
    
    // Page transition effect
    $('a[href^="/"]').click(function(e) {
        if (!$(this).hasClass('no-transition')) {
            e.preventDefault();
            const href = $(this).attr('href');
            $('body').fadeOut(300, function() {
                window.location.href = href;
            });
        }
    });
    
    // Video autoplay on mobile
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('video').attr('autoplay', false);
    }
    
    // Initialize tooltips
    $('[data-tooltip]').hover(function() {
        const tooltip = $(this).data('tooltip');
        $(this).append('<div class="tooltip">' + tooltip + '</div>');
    }, function() {
        $(this).find('.tooltip').remove();
    });
    
    // Parallax effect for hero section (修正版)
    // パララックス効果を無効化する場合は以下のコメントアウトを解除
    /*
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.mv_bg');
        const speed = scrolled * 0.3; // 速度を調整
        
        // ビューポート内にある場合のみパララックス効果を適用
        if (scrolled < $(window).height()) {
            parallax.css('transform', 'translateY(' + speed + 'px)');
        } else {
            // ビューポート外に出たら元の位置に戻す
            parallax.css('transform', 'translateY(0)');
        }
    });
    */
    
    // Counter animation
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.text(Math.floor(current));
        }, 20);
    }
    
    // Initialize counters when they come into view
    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = $(entry.target);
                    const target = parseInt(counter.data('target'));
                    animateCounter(counter, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        $('.counter').each(function() {
            counterObserver.observe(this);
        });
    }
    
    // Form field animations
    $('input, textarea').focus(function() {
        $(this).parent().addClass('focused');
    }).blur(function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Initialize all form fields
    $('input, textarea').each(function() {
        if ($(this).val()) {
            $(this).parent().addClass('focused');
        }
    });
    
    // Back to top button
    const backToTop = $('<div class="back-to-top"><i class="fas fa-chevron-up"></i></div>');
    $('body').append(backToTop);
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            backToTop.addClass('visible');
        } else {
            backToTop.removeClass('visible');
        }
    });
    
    backToTop.click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    // Initialize everything
    console.log('Showcase Hotel Kasane website initialized');
    
    // Drawer menu debug
    setTimeout(function() {
        const drawerIcon = document.getElementById('js-drawer');
        const drawerBg = document.querySelector('.drawer-bg');
        console.log('Drawer icon found:', drawerIcon);
        console.log('Drawer background found:', drawerBg);
        
        if (drawerIcon && drawerBg) {
            console.log('Drawer menu elements are ready');
        } else {
            console.error('Drawer menu elements are missing');
        }
    }, 1000);
    
    // Swiper要素の存在確認
    setTimeout(function() {
        const swiperElement = document.querySelector('.swiper-concept');
        const swiperSlides = document.querySelectorAll('.swiper-slide');
        console.log('Swiper element found:', swiperElement);
        console.log('Swiper slides found:', swiperSlides.length);
        
        if (swiperElement && swiperSlides.length > 0) {
            console.log('Swiper HTML structure is correct');
        } else {
            console.error('Swiper HTML structure is missing or incorrect');
        }
    }, 2000);
});
