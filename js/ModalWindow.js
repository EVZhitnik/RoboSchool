const rootSelector = '[data-js-modal]';

class ModalWindow {
    selectors = {
        modalOverlay: '[data-js-modal-overlay]',
        modalInner: '[data-js-modal-inner]',
        buttonCloseModal: '[data-js-modal-button-close]'
    }

    stateClasses = {
        isActive: 'is-active',
        isOpen: 'is-open'
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.modalId = rootElement.id;
        this.modalOverlayElement = this.rootElement.querySelector(this.selectors.modalOverlay);
        this.modalInnerElement = this.rootElement.querySelector(this.selectors.modalInner);
        this.buttonCloseModalElement = this.modalInnerElement.querySelector(this.selectors.buttonCloseModal);

        this.isOpen = false;

        this.init();
    }

    openModal = () => {
        if (this.isOpen) return;

        document.body.classList.add(this.stateClasses.isOpen);

        this.modalOverlayElement.classList.add(this.stateClasses.isActive);
        this.modalInnerElement.classList.add(this.stateClasses.isActive);

        this.isOpen = true;

        this.disableSwiperScroll();
    }

    closeModal = () => {
        if (!this.isOpen) return;

        this.modalInnerElement.classList.remove(this.stateClasses.isActive);
        this.modalOverlayElement.classList.remove(this.stateClasses.isActive);

        document.body.classList.remove(this.stateClasses.isOpen);

        this.isOpen = false;

        this.enableSwiperScroll();
    }

    disableSwiperScroll = () => {
        const swiper = document.querySelector('.coaches-slider').swiper;
        if (swiper) {
            swiper.disable();
        }
    }

    enableSwiperScroll = () => {
        const swiper = document.querySelector('.coaches-slider').swiper;
        if (swiper) {
            swiper.enable();
        }
    }

    handleOverlayClick = (element) => {
        if (element.target === this.modalOverlayElement) {
            this.closeModal();
        }
    }

    handleKeyDown = (element) => {
        if (element.key === 'Escape' && this.isOpen) {
            this.closeModal();
        }
    }

    init() {
        const openModalButtonElement = document.querySelector(`[data-modal-target="${this.modalId}"]`);
        if (openModalButtonElement) {
            openModalButtonElement.addEventListener('click', this.openModal);
        }

        this.buttonCloseModalElement.addEventListener('click', this.closeModal);
        this.modalOverlayElement.addEventListener('click', this.closeModal);
        document.addEventListener('keydown', this.handleKeyDown);
    }
}

class ModalWindowCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ModalWindow(element);
        });
    }
}

export default ModalWindowCollection;