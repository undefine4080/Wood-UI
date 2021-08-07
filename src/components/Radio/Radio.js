import './radio.less';
import WDU from '../../WDU';

export default class Radio extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-radio';
        this.genDOM = this.genDOM.bind(this);

        super.init(this.PREFIX, this.genDOM);
    }

    genDOM(ele) {
        const needHtml = [['label', 'label'], ['span', 'checkmark']];
        const BOXES = super.genHTML(needHtml);
        const radioFather = ele.parentNode;

        const {label} = super.getOption(ele);
        if(label) {
            BOXES['label'].innerText = label;
        }

        ele.setAttribute('type', 'radio');
        radioFather.appendChild(BOXES['label']);
        // BOXES['label'].setAttribute('for', ele.getAttribute('id'))
        BOXES['label'].appendChild(radioFather.removeChild(ele));
        BOXES['label'].appendChild(BOXES['checkmark']);

        // 禁用状态
        if(ele.disabled) {
            BOXES['label'].lastChild.classList.add(`${this.PREFIX}-disabled`);
            BOXES['label'].classList.add(`${this.PREFIX}-disabled`);
        }
    }
}
