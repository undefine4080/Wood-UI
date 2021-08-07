import './checkbox.less';
import WDU from '../../WDU';

export default class Checkbox extends WDU {
    constructor() {
        super();

        this.PREFIX = 'wdu-checkbox';
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

        ele.setAttribute('type', 'checkbox');
        radioFather.appendChild(BOXES['label']);
        BOXES['label'].setAttribute('for', ele.getAttribute('id'));
        BOXES['label'].appendChild(radioFather.removeChild(ele));
        BOXES['label'].appendChild(BOXES['checkmark']);

        if(ele.disabled) {
            BOXES['checkmark'].classList.add(`${this.PREFIX}-disabled`);
            BOXES['label'].classList.add(`${this.PREFIX}-disabled`);
        }
    }
}
