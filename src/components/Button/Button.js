import '../../WDU'

class Button {
    constructor() {
        this.PREFIX = '.wdu-'
        this.init()
    }

    init() {
        const allButton = Array.from(document.querySelectorAll('.wdu-button'))
        allButton.forEach(btn => {
            const options = btn.dataset
            btn.classList.add(`wdu-button-${options.size}`)
            btn.removeAttribute('data-size')
            btn.classList.add(`wdu-button-${options.type}`)
            btn.removeAttribute('data-type')
            if (options.shadow = 'false') {
                btn.style.boxShadow = "none"
            }
        })
    }
}

export { Button }