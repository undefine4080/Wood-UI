import WDU from '../../WDU';
import './textarea.less';

export default class SingleTextarea extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-textarea';
        this.genDom(ele);
        this.setRawConfig(ele);
        this.setOption(ele);
    }

    genDom(ele) {
        const needHtml = [['label', 'label'], ['div', 'container']];
        const E = super.genHTML(needHtml);
        const container = E['container'];
        this.label = E['label'];
        ele.parentNode.appendChild(container);
        container.appendChild(this.label);
        container.appendChild(ele);
    }

    setRawConfig(ele) {
        if(ele.id) {
            this.label.setAttribute('for', ele.id);
        }
    }

    setOption(ele) {
        const {label, resize} = super.getOption(ele);
        // 标签文字
        if(label) {
            this.label.innerText = label;
        }
        // 调整大小
        if(JSON.parse(resize)) {
            ele.style['resize'] = 'auto';
        } else {
            ele.style['resize'] = 'none';
        }
    }
}