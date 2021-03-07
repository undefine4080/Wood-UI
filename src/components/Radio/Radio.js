import './radio.less'
import {WDU} from '../../WDU'

class Radio extends WDU{
    constructor () {
        super()

        this.PREFIX = 'wdu-radio'
        this.genDOM = this.genDOM.bind(this)

        super.init(this.PREFIX, this.genDOM)
    }

    genDOM(ele) {
        const needHtml = [['label','label'], ['span','checkmark']]
        const BOXES = super.genHTML(needHtml)
        const radioFather = ele.parentNode
        const option = JSON.parse(ele.dataset.option)

        radioFather.appendChild(BOXES['label'])

        BOXES['label'].innerText = option.lable
        BOXES['label'].setAttribute('for', ele.getAttribute('id'))
        BOXES['label'].appendChild(radioFather.removeChild(ele))
        BOXES['label'].appendChild(BOXES['checkmark'])

        ele.removeAttribute('data-option')
    }
}

export { Radio }