import './collapse.less'
import WDU from '../../WDU'

export default class SingleCollapse extends WDU {
    constructor(ele) {
        super()
        this.PREFIX = 'wdu-collapse'
        this.genDom(ele)
        this.addEvt()
        this.setOption()
    }

    genDom(ele) {
        this.element = ele
        this.menus = super.getElementChilds(ele)
        this.titles = []
        this.menus.forEach(menu => {
            const E = super.genHTML([['div', 'title'], ['div', 'block']])

            const items = super.getElementChilds(menu)
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
            }
            if(item.dataset.on) {
                this.openCollapse(item)
            }

            super.wipeOption(item)
        })
    }

    openCollapse(menu) {
        const block = super.getElementChilds(menu)[1]
        const menuItems = super.getElementChilds(block).length
        block.style.height = `${menuItems * 40}px`
    }

    linkTo(item) {
        if(item.dataset.url) {
            window.location.href = item.dataset.url
        }
    }

    addEvt() {
        this.titles.forEach(title => {
            title.addEventListener('click', (e) => {
                debugger
                const curBlock = e.target.nextElementSibling
                let curHeight = curBlock.style.height

                if(!curHeight) {
                    const menu = e.target.parentNode
                    this.openCollapse(menu)
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