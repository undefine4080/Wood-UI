import './input.less'
import WDU from '../../WDU'

export default class Input extends WDU {
    constructor() {
        super()
        this.PREFIX = 'wdu-input'
        this.genDom = this.genDom.bind(this)
        super.init(this.PREFIX, this.genDom)
    }

    genDom(ele) {
        const needHtml = [['label', 'label'], ['input', 'input']]
        const BOXES = super.genHTML(needHtml)

        ele.appendChild(BOXES['label'])
        ele.appendChild(BOXES['input'])

        this.setOption(ele)
        super.wipeOption(ele)
    }

    setOption(ele) {
        const input = ele.lastChild

        if(ele.dataset.option) {
            const option = JSON.parse(ele.dataset.option)
            if(option.input) {
                Object.entries(option.input).forEach(item => {
                    input.setAttribute(item[0], item[1])
                })
            }

            if(option.type) {
                input.setAttribute('type', option.type)
            } else {
                input.setAttribute('type', "text")
            }

            if(option.size) {
                ele.classList.add(`${this.PREFIX}-${option.size}`)
            } else {
                ele.classList.add(`${this.PREFIX}-medium`)
            }

             ele.firstChild.innerText = option.label
        } else {
            input.setAttribute('type', "text")
            ele.classList.add(`${this.PREFIX}-medium`)
        }
    }
}