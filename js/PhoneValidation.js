class PhoneValidation {
    selectors = {
        root: '[data-js-phone-input]',
    }

    stateClasses = {
        isActive: 'is-active',
    }

    constructor() {
        this.inputElement = document.querySelector(this.selectors.root);
        this.init();
    }

    changeOfNumber = (event) => {
        const input = event.target;
        const cursorPosition = input.selectionStart;
        
        const isDeletion = event.inputType === 'deleteContentBackward';
        
        let phoneNumber = input.value.replace(/\D/g, '');

        if (phoneNumber.length === 0) {
            phoneNumber = '7';
        } else if (!phoneNumber.startsWith('7')) {
            phoneNumber = '7' + phoneNumber;
        }

        let formattedNumber = '+7';

        if (phoneNumber.length > 1) {
            formattedNumber += ' (' + phoneNumber.substring(1, 4);
        }
        if (phoneNumber.length >= 4) {
            formattedNumber += ') ' + phoneNumber.substring(4, 7);
        }
        if (phoneNumber.length >= 7) {
            formattedNumber += ' ' + phoneNumber.substring(7, 9);
        }
        if (phoneNumber.length >= 9) {
            formattedNumber += '-' + phoneNumber.substring(9, 11);
        }

        if (input.value.startsWith('+7') && formattedNumber.startsWith('+7')) {
            input.value = formattedNumber;
        } else {
            input.value = '+7 (' + formattedNumber.substring(4);
        }

        if (isDeletion) {
            let newPosition = cursorPosition;
            
            if (cursorPosition <= 4) {
                newPosition = 4;
            } 

            else {
                const separators = ['(', ')', ' ', '-'];
                if (separators.includes(formattedNumber[cursorPosition - 1])) {
                    newPosition = cursorPosition - 1;
                }
            }
            
            input.setSelectionRange(newPosition, newPosition);
        }
    }

    init() {
        this.inputElement.addEventListener('input', this.changeOfNumber);
        
        this.inputElement.addEventListener('keydown', (event) => {
            const cursorPosition = this.inputElement.selectionStart;
            
            if ((event.key === 'Backspace' || event.key === 'Delete') && cursorPosition <= 4) {
                event.preventDefault();
            }
        });
    }
}

export default PhoneValidation;