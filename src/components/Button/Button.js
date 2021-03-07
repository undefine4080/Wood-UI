import './button.less'
import {WDU} from '../../WDU'
class Button extends WDU{
    constructor () {
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
        const option = JSON.parse(ele.dataset.option)
        ele.classList.add(`w-btn-${option.size}`)
        ele.classList.add(`w-btn-${option.type}`)
        ele.removeAttribute('data-option')
    }
}

export { Button }