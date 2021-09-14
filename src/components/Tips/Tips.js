import WDU from '../../WDU';
import './tips.less';

class SingleTips extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-tips';
        this.ELE = ele;
        this.TYPES = ['normal', 'important', 'danger'];
        this.addEvt();
    }

    setOptions() {
        const {type, text} = super.getOption(this.ELE);

        // 提示类型
        if(type) {
            this.type = type;
        } else {
            this.type = 'normal';
        }

        // 提示内容
        if(text) {
            this.content = text;
        } else {
            this.content = '';
        }

        this.tipsElement.classList.add(`${this.PREFIX}-${this.type}`);
    }

    addEvt() {
        this.ELE.addEventListener('mouseover', e => {
            e.stopPropagation();
            this.setOptions();
            this.setPosition();
            this.showTips();
        });

        this.ELE.addEventListener('mouseleave', e => {
            e.stopPropagation();
            this.setOptions();
            this.tipsElement.classList.add(`${this.PREFIX}-hide`);
        });
    }

    showTips() {
        this.TYPES.forEach(type => {
            if(type !== this.type) {
                this.tipsElement.classList.remove(`${this.PREFIX}-${type}`);
            }
        });

        this.tipsElement.classList.remove(`${this.PREFIX}-hide`);
    }

    setPosition() {
        const tips = this.tipsElement;
        tips.innerText = this.content; // 设置 tips 内容

        const {x, y} = this.ELE.getBoundingClientRect(); // 目标元素相对于浏览器窗口的坐标
        const horizon = this.ELE.offsetWidth / 2 - tips.offsetWidth / 2; // tips 出现的水平位置，位于目标元素的中点
        // 设置tips位置
        tips.style.left = `${x + horizon}px`;
        tips.style.top = `${y - tips.offsetHeight}px`;
    }
}


export default class Tips extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-tips';
        SingleTips.prototype.tipsElement = super.genHTML([['p', 'content']])['content'];
        document.body.appendChild(SingleTips.prototype.tipsElement);
        super.initMult(this.PREFIX, SingleTips);
    }
}