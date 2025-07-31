 document.addEventListener('DOMContentLoaded', function() {
            const swiper = new Swiper('.tech-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 30,
                loop: true,
                allowTouchMove: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: true
                },
                breakpoints: {
                    320: {
                        spaceBetween: 20
                    },
                    480: {
                        spaceBetween: 30
                    },
                    640: {
                        spaceBetween: 40
                    }
                },
                on: {
                    beforeInit: function () {
                        // Duplicate slides for smoother infinite loop
                        const slides = this.el.querySelectorAll('.swiper-slide');
                        slides.forEach(slide => {
                            this.el.querySelector('.swiper-wrapper').appendChild(slide.cloneNode(true));
                        });
                    }
                }
            });
    
            // Force start autoplay
            swiper.autoplay.start();
        });