import { WDU } from '../../WDU'
import './card.less'

class Card extends WDU {
    constructor () {
        super()
        
        this.PREFIX = 'wdu-card'
        this.genDom = this.genDom.bind(this)

        super.init(this.PREFIX, this.genDom)
    }

    setOption(ele,BOXES) {
        const option = JSON.parse(ele.dataset.option)
        BOXES['img'].style.backgroundImage = `url(${option.img})`
        BOXES['title'].innerText = option.title
        BOXES['info'].innerText = option.info
        
        if(option.size){
            ele.classList.add(`${this.PREFIX}-${option.size}`)
        }

        ele.removeAttribute('data-option')
    }

    genDom(ele) {
        const needHtml = [['div', 'img'], ['div', 'title'], ['div', 'info']]
        const BOXES = super.genHTML(needHtml)
        this.setOption(ele,BOXES)
        super.wipeOption(ele)
        Object.keys(BOXES).forEach(item => {
            ele.appendChild(BOXES[item])
        })
    }
}

export { Card }