import './switch.less'
import WDU from '../../WDU'

export default class Switch extends WDU {
    constructor() {
        super()
        this.PREFIX = 'wdu-switch'
        this.isOn = false
        this.genDom = this.genDom.bind(this)
        super.init(this.PREFIX, this.genDom)
    }

    genDom(ele) {
        // ele 是 switch 组件的外围容器
        const needHtml = [['div', 'open'], ['div', 'open-dot'], ['div', 'btn'], ['div', 'close'], ['div', 'close-dot'], ['label', 'label'], ['div', 'switch'], ['div', 'slide']]
        const E = super.genHTML(needHtml)
        // 剪切标签内容
        E['label'].innerText = ele.innerText
        ele.innerText = null
        // 圆点指示
        E['open'].appendChild(E['open-dot'])
        E['close'].appendChild(E['close-dot'])
        // 添加到 slide 滑块
        new Array(E['open'], E['btn'], E['close']).forEach(item => {
            E['slide'].appendChild(item)
        })

        E['switch'].appendChild(E['slide'])

        ele.appendChild(E['label'])
        ele.appendChild(E['switch'])

        this.setOption(ele)

        super.wipeOption(ele)
    }

    setOption(ele) {
        const switchEle = ele.lastChild.firstChild
        const status = ele.dataset.status
        if(status) {
            switch(status) {
                case 'on':
                    switchEle.classList.add("s-on")
                    break
                case 'disabled':
                    super.disableComponent(ele, this.PREFIX)
                    break
            }
        }

        this.addEvt(switchEle)
    }

    addEvt(ele) {
        ele.addEventListener('click', (e) => {
            ele.classList.toggle("s-on")
            this.isOn = !this.isOn
        })
    }

    callBack(element, event) {
        if(event) {
            document.querySelector(element).addEventListener('click', () => {
                // 将当前开关状态传入回调函数
                event(!this.isOn)
            })
        }
    }
}