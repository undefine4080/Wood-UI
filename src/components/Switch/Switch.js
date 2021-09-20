import './switch.less';
import WDU from '../../WDU';

class singleSwitch extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-switch';
        this.ELE = ele;
        this.isOn = false;
        this.click = null;
        this.genDom();
        this.setOption();
        this.addEvt();
    }

    genDom() {
        const needHtml = [['div', 'open'], ['div', 'open-dot'], ['div', 'btn'], ['div', 'close'], ['div', 'close-dot'], ['label', 'label'], ['div', 'switch'], ['div', 'slide']];
        const E = super.genHTML(needHtml);
        // 剪切标签内容
        E['label'].innerText = this.ELE.innerText;
        this.ELE.innerText = null;
        // 圆点指示
        E['open'].appendChild(E['open-dot']);
        E['close'].appendChild(E['close-dot']);
        // 添加到 slide 滑块
        new Array(E['open'], E['btn'], E['close']).forEach(item => {
            E['slide'].appendChild(item);
        });

        E['switch'].appendChild(E['slide']);

        this.ELE.appendChild(E['label']);
        this.ELE.appendChild(E['switch']);
    }

    setOption() {
        this.switchEle = this.ELE.lastChild.firstChild;
        const {on, disabled} = super.getOption(this.ELE);
        if(on) {
            this.switchEle.classList.add("s-on");
        } else {
            this.switchEle.classList.remove("s-on");
        }

        if(disabled) {
            super.disableComponent(this.ELE, this.PREFIX);
        }
    }

    addEvt() {
        this.switchEle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.switchEle.classList.toggle("s-on");
            this.isOn = !this.isOn;
            this.click(this.isOn);
        });
    }
}

export default class Switch extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-switch';
        super.initMult(this.PREFIX, singleSwitch);
    }
}