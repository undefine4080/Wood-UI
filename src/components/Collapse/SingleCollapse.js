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
        this.element = ele
        this.menus = super.getElementChilds(ele.childNodes)
        this.titles = []
        this.menus.forEach(menu => {
            const E = super.genHTML([['div', 'title'], ['div', 'block']])

            const items = super.getElementChilds(menu.childNodes)
            items.forEach(item => {
                E['block'].appendChild(item)
            })

            this.titles.push(E['title'])
            menu.insertBefore(E['title'], menu.firstChild)
            menu.appendChild(E['block'])
        })
    }

    setOption() {
        this.menus.forEach((item, index) => {
            if(item.dataset.title) {
                this.titles[index].innerText = item.dataset.title
                super.wipeOption(item)
            }
        })
    }

    linkTo(item) {
        if(item.dataset.link) {
            const link = JSON.parse(item.dataset.link)
            if(!link.current) {
                window.location.href = link.url
            } else {
                window.open(link.url)
            }
            super.wipeOption(item)
        }
    }

    addEvt() {
        this.titles.forEach(title => {
            title.addEventListener('click', (e) => {
                const curBlock = e.target.nextElementSibling
                let curHeight = curBlock.style.height
                if(!curHeight) {
                    curBlock.style.height = `${Array.from(curBlock.childNodes).length * 40}px`
                } else {
                    curBlock.style.height = null
                }
            })
        })

        const menuItems = Array.from(this.element.querySelectorAll(`.${this.PREFIX}-item`))

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation()
                this.linkTo(item)
            })
        })

        
    }
}