import './radio.less'

class Radio {
    constructor () {
        this.init()
    }

    init() {
        const allRadio = Array.from(document.querySelectorAll('.wdu-radio'))
        allRadio.forEach(radio => {
            this.genDOM(radio)
        })
    }

    genDOM(ele) {
        const lable = document.createElement('label')
        const checkMark = document.createElement('span')
        const radioFather = ele.parentNode
        const option = JSON.parse(ele.dataset.option)

        radioFather.appendChild(lable)

        lable.innerText = option.lable
        lable.setAttribute('for', ele.getAttribute('id'))
        lable.classList.add('wdu-radio-lable')

        checkMark.classList.add('wdu-radio-checkmark')

        lable.appendChild(radioFather.removeChild(ele))
        lable.appendChild(checkMark)

        ele.removeAttribute('data-option')
    }
}

export { Radio }