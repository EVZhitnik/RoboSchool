class InitSlider {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.slider = null;
        this.init();
    }

    init() {
        this.slider = new Swiper(this.selector, this.options);
        return this.slider;
    }
}

class InitSliderCollection {
    constructor() {
        this.sliders = {};
        this.init();
    }

    init() {
        this.sliders.top = new InitSlider('.swiper', {
            slidesPerView: 2.5,
            spaceBetween: 20,
            freeMode: true,
            direction: 'horizontal',
            speed: 300,
            loop: true,
            autoplay: {
                delay: 3000, 
                disableOnInteraction: true, 
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.coaches-slider__scrollbar',
                draggable: true,
                hide: false,
                snapOnRelease: true,
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            }
        }).slider;
    }
}

export default InitSliderCollection;