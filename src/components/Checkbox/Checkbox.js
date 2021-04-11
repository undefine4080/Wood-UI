import './checkbox.less'
import WDU from '../../WDU'

export default class Checkbox extends WDU {
    constructor() {
        super()

        this.PREFIX = 'wdu-checkbox'
        this.genDOM = this.genDOM.bind(this)

        super.init(this.PREFIX, this.genDOM)
    }

    genDOM(ele) {
        const needHtml = [['label', 'label'], ['span', 'checkmark']]
        const BOXES = super.genHTML(needHtml)
        const radioFather = ele.parentNode

        if(ele.dataset.label) {
            BOXES['label'].innerText = ele.dataset.label
        }

        ele.setAttribute('type', 'checkbox')
        radioFather.appendChild(BOXES['label'])
        BOXES['label'].setAttribute('for', ele.getAttribute('id'))
        BOXES['label'].appendChild(radioFather.removeChild(ele))
        BOXES['label'].appendChild(BOXES['checkmark'])

        if(ele.disabled) {
            BOXES['checkmark'].classList.add(`${this.PREFIX}-disabled`)
            BOXES['label'].classList.add(`${this.PREFIX}-disabled`)
        }

        super.wipeOption(ele)
    }
}
