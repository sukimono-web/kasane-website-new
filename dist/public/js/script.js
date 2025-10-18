// Main JavaScript for Showcase Hotel Kasane
$(document).ready(function() {
    
    // Loading animation with counter
    let loadingProgress = 0;
    let logoFadeStarted = false;
    let loadingComplete = false;
    let startTime = Date.now();
    const minLoadingTime = 3000; // 最低3秒表示に短縮
    
    // WOW.js initialization
    let wowInstance = null;
    
    function initWOW() {
        if (typeof WOW !== 'undefined') {
            wowInstance = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: true,
                live: true,
                scrollContainer: null
            });
            wowInstance.init();
            console.log('WOW.js initialized successfully');
            
            const wowElements = document.querySelectorAll('.wow');
            console.log('WOW elements found:', wowElements.length);
        } else {
            console.warn('WOW.js library not loaded yet');
        }
    }
    
    // ローディング画面の有無を確認
    const loadingElement = document.getElementById('loading');
    const hasLoadingScreen = loadingElement !== null;
    
    if (!hasLoadingScreen) {
        // ローディング画面がないページでは即座に初期化
        setTimeout(initWOW, 200);
        console.log('No loading screen - initializing WOW.js immediately');
    }
    
    // 実際のページ読み込み状況をチェック
    function checkPageLoad() {
        const images = document.querySelectorAll('img');
        const totalImages = images.length;
        let loadedImages = 0;
        
        images.forEach(function(img) {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', function() {
                    loadedImages++;
                });
            }
        });
        
        return totalImages > 0 ? (loadedImages / totalImages) * 100 : 100;
    }
    
    // ローディング画面がある場合のみ実行
    if (hasLoadingScreen) {
        const loadingInterval = setInterval(function() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            
            const realProgress = checkPageLoad();
            const timeBasedProgress = Math.min((elapsedTime / minLoadingTime) * 100, 100);
            loadingProgress = Math.min(realProgress * 0.3 + timeBasedProgress * 0.7, 100);
            
            $('#loading-percentage').text(Math.floor(loadingProgress));
            
            // 70%でロゴのフェードアウト開始
            if (loadingProgress >= 70 && !logoFadeStarted) {
                logoFadeStarted = true;
                $('#loading').addClass('logo-fadeout');
                console.log('Logo fade out started at', Math.floor(loadingProgress) + '%');
            }
            
            // 100%でローディング画面を非表示
            if (loadingProgress >= 100 && elapsedTime >= minLoadingTime && !loadingComplete) {
                loadingComplete = true;
                clearInterval(loadingInterval);
                $('#loading-percentage').text('100');
                
                setTimeout(function() {
                    $('#loading').fadeOut(1000, function() {
                        console.log('Loading screen hidden');
                        // ローディング画面非表示後にWOW.jsを初期化
                        setTimeout(initWOW, 100);
                    });
                }, 300);
            }
        }, 100);
    }
    
    // Drawer menu
    $('#js-drawer').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const $drawerIcon = $(this);
        const $drawerBg = $('.drawer-bg');
        const isActive = $drawerIcon.hasClass('active');
        
        if (isActive) {
            $drawerBg.removeClass('is-active');
            $drawerIcon.removeClass('active');
        } else {
            $drawerIcon.addClass('active');
            setTimeout(function() {
                $drawerBg.addClass('is-active');
            }, 150);
        }
    });
    
    $('.drawer-bg').click(function(e) {
        if (e.target === this) {
            closeDrawerMenu();
        }
    });
    
    $('.drawer__links a').click(function() {
        closeDrawerMenu();
    });
    
    function closeDrawerMenu() {
        $('.drawer-bg').removeClass('is-active');
        $('#js-drawer').removeClass('active');
    }
    
    // Swiper initialization
    setTimeout(function() {
        if (typeof Swiper !== 'undefined') {
            // Concept Swiper
            const conceptSwiperElement = document.querySelector('.swiper-concept');
            if (conceptSwiperElement) {
                new Swiper('.swiper-concept', {
                    loop: true,
                    autoplay: false,
                    pagination: {
                        el: '.swiper-concept__pagination',
                        clickable: false,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    slidesPerView: 1,
                    spaceBetween: 30,
                });
            }
            
            // Rooms Swiper
            const roomsSwiperElement = document.querySelector('.swiper-rooms');
            if (roomsSwiperElement) {
                new Swiper('.swiper-rooms', {
                    loop: true,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    },
                    speed: 1600,
                    pagination: {
                        el: '.swiper-rooms__pagination',
                        clickable: true,
                    },
                    slidesPerView: 1,
                    spaceBetween: 0,
                    effect: 'fade',
                    fadeEffect: {
                        crossFade: true
                    },
                    allowTouchMove: true,
                });
            }
        }
    }, 800);
    
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
                bgmButton.classList.add('stopped');
                isPlaying = false;
            } else {
                audio.play();
                bgmButton.classList.add('playing');
                bgmButton.classList.remove('stopped');
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
        
        if (wowInstance) {
            wowInstance.sync();
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
    
    // Close mobile menu when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.drawer-icon, .drawer-bg').length) {
            closeDrawerMenu();
        }
    });
    
    console.log('Showcase Hotel Kasane website initialized');
});