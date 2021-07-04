import './radio.less'
import WDU from '../../WDU'

export default class Radio extends WDU {
    constructor() {
        super()

        this.PREFIX = 'wdu-radio'
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

        ele.setAttribute('type', 'radio')
        radioFather.appendChild(BOXES['label'])
        // BOXES['label'].setAttribute('for', ele.getAttribute('id'))
        BOXES['label'].appendChild(radioFather.removeChild(ele))
        BOXES['label'].appendChild(BOXES['checkmark'])

        if(ele.disabled) {
            BOXES['label'].lastChild.classList.add(`${this.PREFIX}-disabled`)
            
        }

        super.wipeOption(ele)
    }
}
