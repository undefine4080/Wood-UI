import './input.less';
import WDU from '../../WDU';

export default class Input extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-input';
        this.ele = null;
        this.genDom = this.genDom.bind(this);
        super.init(this.PREFIX, this.genDom);
    }

    genDom(ele) {
        this.ele = ele;
        const needHtml = [['label', 'label'], ['input', 'input']];
        const BOXES = super.genHTML(needHtml);
        BOXES['label'].innerText = ele.innerText;
        ele.innerText = null;

        ele.appendChild(BOXES['label']);
        ele.appendChild(BOXES['input']);


        this.setOption(ele);
    }

    setOption(ele) {
        const inputElement = ele.lastChild;
        const {input, size, type} = super.getOption(ele);

        if(input) {
            Object.entries(input).forEach(item => {
                inputElement.setAttribute(item[0], item[1]);
            });
        } else {
            inputElement.setAttribute('type', "text");
        }

        if(type) {
            inputElement.setAttribute('type', type);
        } else {
            inputElement.setAttribute('type', "text");
        }

        if(size) {
            ele.classList.add(`${this.PREFIX}-${size}`);
        } else {
            ele.classList.add(`${this.PREFIX}-normal`);
        }

    }
}