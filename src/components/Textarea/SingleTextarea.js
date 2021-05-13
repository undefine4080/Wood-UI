import WDU from '../../WDU'
import './textarea.less'

export default class SingleTextarea extends WDU {
    constructor(ele) {
        super()
        this.PREFIX = 'wdu-textarea'
        this.genDom(ele)
        this.setRawConfig(ele)
        this.setOption(ele)
    }

    genDom(ele) {
        const needHtml = [['label', 'label'], ['div', 'container']]
        const E = super.genHTML(needHtml)
        const container = E['container']
        this.label = E['label']
        ele.parentNode.appendChild(container)
        container.appendChild(this.label)
        container.appendChild(ele)
    }

    setRawConfig(ele) {
        if(ele.id) {
            this.label.setAttribute('for', ele.id)
        }
    }

    setOption(ele) {
        if(ele.dataset.option) {
            const option = JSON.parse(ele.dataset.option)
            // 标签文字
            if(option.label) {
                this.label.innerText = option.label
            }
            // 调整大小
            if(option.resize) {
                ele.style['resize'] = 'auto'
            } else {
                ele.style['resize'] = 'none'
            }
        }

        super.wipeOption(ele)
    }
}