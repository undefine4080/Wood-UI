import './input.less';
import WDU from '../../WDU';

class singleInput extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-input';
        this.ELE = ele;
        this.genDom();
        this.setOption();
    }

    genDom() {
        const needHtml = [['label', 'label'], ['input', 'input']];
        const E = super.genHTML(needHtml);
        E['label'].innerText = this.ELE.innerText;
        this.ELE.innerText = null;
        this.ELE.appendChild(E['label']);
        this.ELE.appendChild(E['input']);
        this.ELE = this.ELE;
    }

    setOption() {
        const inputElement = this.ELE.lastChild;
        const {size, type, tips} = super.getOption(this.ELE);

        if(type) {
            inputElement.setAttribute('type', type);
        } else {
            inputElement.setAttribute('type', "text");
        }

        if(size) {
            this.ELE.classList.add(`${this.PREFIX}-${size}`);
        } else {
            this.ELE.classList.add(`${this.PREFIX}-normal`);
        }

        if(tips) {
            inputElement.setAttribute('placeholder', tips);
        }
    }
}

export default class Input extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-input';
        super.initMult(this.PREFIX, singleInput);
    }
}