import WDU from '../../WDU';
import './card.less';

export default class Card extends WDU {
    constructor() {
        super();

        this.PREFIX = 'wdu-card';
        this.genDom = this.genDom.bind(this);

        super.init(this.PREFIX, this.genDom);
    }

    setOption(ele, BOXES) {
        const {title, info, img, size} = super.getOption(ele);
        BOXES['img'].style.backgroundImage = `url(${img})`;
        BOXES['title'].innerText = title;
        BOXES['info'].innerText = info;

        if(size) {
            ele.classList.add(`${this.PREFIX}-${size}`);
        }else{
            ele.classList.add(`${this.PREFIX}-normal`);
        }
    }

    genDom(ele) {
        const needHtml = [['div', 'img'], ['div', 'title'], ['div', 'info']];
        const BOXES = super.genHTML(needHtml);
        this.setOption(ele, BOXES);
        Object.keys(BOXES).forEach(item => {
            ele.appendChild(BOXES[item]);
        });
    }
}