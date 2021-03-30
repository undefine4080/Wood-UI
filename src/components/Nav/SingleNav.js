import WDU from '../../WDU'
import './nav.less'

export default class SingleNav extends WDU {
    constructor(ele) {
        super()
        this.PREFIX = 'wdu-nav'
        this.genDom(ele)
        this.setOption()
        this.addEvt()
    }

    genDom(ele) {
        this.menus = super.getElementChilds(ele.childNodes)
        this.titles = []
        this.menus.forEach(menu => {
            const E = super.genHTML([['div', 'title'], ['div', 'block']])
            const navItems = super.getElementChilds(menu.childNodes)
            navItems.forEach(navItem => {
                E['block'].appendChild(navItem)
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

    addEvt() {
        // 每个展开的子项目 item 的高度
        this.ITEM_HEIGHT = 35
        // 是否展开标记
        this.isOpen = false
        this.menus.forEach(menu => {
            menu.addEventListener('mouseenter', e => {
                if(this.isOpen == false) {
                    this.navOpen(e)
                }
            })
            menu.addEventListener('mouseleave', e => {
                if(this.isOpen) {
                    this.navClose(e)
                }
            })
            // 每个选项点击后，收起菜单
            const items = super.getElementChilds(menu.lastElementChild.childNodes)
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation()
                    e.target.parentNode.style.height = '0px'
                    this.isOpen = false
                })
            })
        })
    }

    navOpen(e) {
        e.stopPropagation()
        const curBlock = e.target.lastElementChild
        const curItems = super.getElementChilds(curBlock.childNodes).length
        curBlock.style.height = `${this.ITEM_HEIGHT * curItems}px`
        this.isOpen = true
    }

    navClose(e) {
        e.stopPropagation()
        const curBlock = e.target.lastElementChild
        curBlock.style.height = '0px'
        this.isOpen = false
    }
}