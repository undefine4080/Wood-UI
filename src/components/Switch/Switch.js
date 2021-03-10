import './switch.less';
import { WDU } from '../../WDU'

class Switch extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-switch'
        this.isOn = false
        this.genDom = this.genDom.bind(this)
        super.init(this.PREFIX, this.genDom)
    }

    genDom(ele) {
        const needHtml = [['div', 'open'], ['div', 'open-dot'], ['div', 'btn'], ['div', 'close'], ['div', 'close-dot'], ['label', 'label'], ['div', 'switch'],['div','slide']]
        const E = super.genHTML(needHtml)

        E['open'].appendChild(E['open-dot'])
        E['close'].appendChild(E['close-dot'])

        new Array(E['open'], E['btn'], E['close']).forEach(item => {
            E['slide'].appendChild(item)
        })

        E['switch'].appendChild(E['slide'])

        // ele 是 switch 组件的外围容器
        ele.appendChild(E['label'])
        ele.appendChild(E['switch'])

        this.setOption(ele)

        super.wipeOption(ele)
    }

    setOption(ele) {
        const option = JSON.parse(ele.dataset.option)
        ele.firstChild.innerText = option.label
        this.addEvt(ele.lastChild.firstChild)
    }

    addEvt(ele) {
        ele.addEventListener('click', (e) => {
            e.stopPropagation()
            ele.classList.toggle("s-on")
            this.isOn = !this.isOn
        })
    }
}

export { Switch }