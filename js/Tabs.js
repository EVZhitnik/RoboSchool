const rootSelector = '[data-js-tabs]';

class Tabs {
    stateClasses = {
        isVisible: 'is-visible',
        isActive: 'is-active'
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.init();
    }

    showTab = (event) => {
        const buttonElement = event.target.closest('[data-tab]');
        if (!buttonElement) return;

        const targetTab = buttonElement.dataset.tab;
        
        const targetContent = this.rootElement.querySelector(`[data-tab-content="${targetTab}"]`);
        if (!targetContent) return;

        const currentContent = this.rootElement.querySelector('.tabs__content.is-visible');
        const currentButton = this.rootElement.querySelector('.tabs__button.is-active');

        if (buttonElement === currentButton) return;

        if (currentContent) {
            currentContent.classList.remove(this.stateClasses.isVisible);
        }

        targetContent.classList.add(this.stateClasses.isVisible);

        if (currentButton) {
            currentButton.classList.remove(this.stateClasses.isActive);
            currentButton.setAttribute('aria-selected', 'false');
        }
        
        buttonElement.classList.add(this.stateClasses.isActive);
        buttonElement.setAttribute('aria-selected', 'true');
    }

    init() {
        this.rootElement.addEventListener('click', this.showTab);
    }
}

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element);
        });
    }
}

export default TabsCollection;