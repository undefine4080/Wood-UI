import './collapse.less'
import WDU from '../../WDU'

export default class SingleCollapse extends WDU {
    constructor(ele) {
        super()
        this.PREFIX = 'wdu-collapse'
        this.genDom(ele)
        this.setOption()
        this.addEvt()
    }

    genDom(ele) {
        this.menus = super.getElementChilds(ele.childNodes)
        this.titles = []
        this.menus.forEach(item => {
            const E = super.genHTML([['div', 'title'], ['div', 'block']])
            const items = super.getElementChilds(item.childNodes)
            items.forEach(item => {
                E['block'].appendChild(item)
            })

            this.titles.push(E['title'])
            item.insertBefore(E['title'], item.firstChild)
            item.appendChild(E['block'])
        })
    }

    setOption() {
        this.menus.forEach((item, index) => {
            if(item.dataset.title) {
                this.titles[index].innerText = item.dataset.title
            }
        })
    }

    addEvt() {
        this.titles.forEach(title => {
            title.addEventListener('click', (e) => {
                const curBlock = e.target.nextElementSibling
                let curHeight = curBlock.style.height
                if(!curHeight){
                    curBlock.style.height =`${Array.from(curBlock.childNodes).length * 40}px`
                }else{
                    curBlock.style.height =null
                }
            })
        })
    }
}