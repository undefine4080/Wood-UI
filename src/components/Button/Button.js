import './button.less';
import WDU from '../../WDU';
export default class Button extends WDU {
    constructor() {
        super();

        this.PREFIX = 'wdu-button';
        this.setOption = this.setOption.bind(this);

        super.init(this.PREFIX, this.setOption);
    }

    /**
     * 应用标签配置项
     * @param {Element} ele dom元素
     */
    setOption(ele) {
        const {size, type} = super.getOption(ele);

        if(size) {
            ele.classList.add(`${this.PREFIX}-${size}`);
        } else {
            ele.classList.add(`${this.PREFIX}-medium`);
        }

        if(type) {
            ele.classList.add(`${this.PREFIX}-${type}`);
        } else {
            ele.classList.add(`${this.PREFIX}-normal`);
        }
    }
}

