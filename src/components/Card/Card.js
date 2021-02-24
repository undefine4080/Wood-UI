import { WDU } from '../../WDU'
import './card.less'

class Card extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-card'
        this.init()
    }

    init() {
        const allCard = Array.from(document.querySelectorAll('.wdu-card'))
        allCard.forEach(card => {
            this.genDom(card)
        })
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
        const needDiv = ['img', 'title', 'info']
        const BOXES = super.genBoxes(needDiv)
        this.setOption(ele,BOXES)
        Object.keys(BOXES).forEach(item => {
            ele.appendChild(BOXES[item])
        })
    }
}

export { Card }