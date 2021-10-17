import WDU from '../../WDU';
import './textarea.less';

class SingleTextarea extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-textarea';
        this.ELE = ele;
        this.genDom();
        this.setRawConfig();
        this.setOption();
    }

    genDom() {
        const needHtml = [['label', 'label'], ['div', 'container']];
        const E = super.genHTML(needHtml);
        const container = E['container'];
        this.label = E['label'];
        this.ELE.parentNode.appendChild(container);
        container.appendChild(this.label);
        container.appendChild(this.ELE);
    }

    setRawConfig() {
        if(this.ELE.id && this.label) {
            this.label.setAttribute('for', this.ELE.id);
        }
    }

    setOption() {
        const {label, resize} = super.getOption(this.ELE);
        const labeledClass = 'wdu-textarea-labeled';
        // 标签文字
        if(label) {
            this.label.innerText = label;
            this.ELE.classList.add(labeledClass);
        } else {
            this.label.classList.add(`${this.PREFIX}-nolabel`);
            this.ELE.classList.remove(labeledClass);
        }
        // 调整大小
        if(resize && resize == 'true') {
            this.ELE.style['resize'] = 'auto';
        } else {
            this.ELE.style['resize'] = 'none';
        }
    }
}

export default class Textarea extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-textarea';
        super.initMult(this.PREFIX, SingleTextarea);
    }
}