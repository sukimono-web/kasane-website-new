// Main JavaScript for Showcase Hotel Kasane
$(document).ready(function() {
    
    // Loading animation
    setTimeout(function() {
        $('#loading').fadeOut(1000);
    }, 2000);
    
    // Drawer menu
    $('#js-drawer').click(function() {
        $('.drawer-bg').fadeToggle();
        $(this).toggleClass('active');
    });
    
    $('.drawer-bg').click(function(e) {
        if (e.target === this) {
            $(this).fadeOut();
            $('#js-drawer').removeClass('active');
        }
    });
    
    // Close drawer when clicking on links
    $('.drawer__links a').click(function() {
        $('.drawer-bg').fadeOut();
        $('#js-drawer').removeClass('active');
    });
    
    // WOW.js initialization
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
    
    // Swiper initialization
    if (typeof Swiper !== 'undefined') {
        const conceptSwiper = new Swiper('.swiper-concept', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-concept__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    
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
        } else {
            $('.header').removeClass('scrolled');
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
    
    // Mobile menu toggle
    $('.drawer-icon').click(function() {
        $(this).toggleClass('active');
        $('.drawer-bg').toggleClass('active');
    });
    
    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.drawer-icon, .drawer-bg').length) {
            $('.drawer-icon').removeClass('active');
            $('.drawer-bg').removeClass('active');
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
    
    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(this).scrollTop();
        const parallax = $('.mv_bg');
        const speed = scrolled * 0.5;
        parallax.css('transform', 'translateY(' + speed + 'px)');
    });
    
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
});
