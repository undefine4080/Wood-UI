import './button.less'
import WDU from '../../WDU'
export default class Button extends WDU {
    constructor() {
        super()

        this.PREFIX = 'wdu-button'
        this.setOption = this.setOption.bind(this)

        super.init(this.PREFIX, this.setOption)
    }

    /**
     * 应用标签配置项
     * @param {Element} ele dom元素
     */
    setOption(ele) {
        if(ele.dataset.option) {
            const option = JSON.parse(ele.dataset.option)

            if(option.size) {
                ele.classList.add(`${this.PREFIX}-${option.size}`)
            } else {
                ele.classList.add(`${this.PREFIX}-medium`)
            }

            if(option.type) {
                ele.classList.add(`${this.PREFIX}-${option.type}`)
            } else {
                ele.classList.add(`${this.PREFIX}-normal`)
            }
        } else {
            new Array(`${this.PREFIX}-medium`, `${this.PREFIX}-normal`).forEach(item => {
                ele.classList.add(item)
            })
        }
        super.wipeOption(ele)
    }
}