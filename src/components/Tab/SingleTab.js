import './tab.less';
import WDU from '../../WDU'

export default class SingleTab extends WDU {
    constructor (ele) {
        super()
        this.PREFIX = 'wdu-tab'
        this.genDom(ele)
        this.setOption()
        this.addEvt()
    }

    genDom(ele) {
        const needHtml = [['div', 'head'], ['div', 'container']]
        this.E = super.genHTML(needHtml)
        this.e = ele
        this.content = super.getElementChilds(ele.childNodes)
        this.content.forEach((item, index) => {
            item.setAttribute('id', `${this.PREFIX}-content-${index}`)
            this.E['container'].appendChild(item)
            const tab = super.genHTML([['div','tab']])['tab']
            tab.setAttribute('id', `${this.PREFIX}-tab-${index}`)
            this.E['head'].appendChild(tab)
        })
        new Array(this.E['head'], this.E['container']).forEach(item =>{
            ele.appendChild(item)
        })
    }

    setOption(){
        const blocks = super.getElementChilds(this.e.lastChild.childNodes)
        this.tabs = super.getElementChilds(this.E['head'].childNodes)
        blocks.forEach((item, index) => {
            if(item.dataset.option){
                const option = JSON.parse(item.dataset.option)
                this.tabs[index].innerText = option.title
            }
        })

        this.content.forEach((item) =>{
            super.wipeOption(item)
        })
    }

    addEvt() {
        this.content[0].style.visibility = 'visible'
        this.tabs[0].classList.add(`${this.PREFIX}-checked`)

        this.tabs.forEach(item => {
            item.addEventListener('click',(e) => {
               const id = parseInt(e.target.id.charAt(e.target.id.length-1))
               this.closeAllTabs()
               this.activateTab(id)
            })
        })
    }

    closeAllTabs(){
        this.content.forEach(item =>{
            item.style.visibility = 'hidden'
        })

        this.tabs.forEach(item => {
            item.classList.remove(`${this.PREFIX}-checked`)
        })
    }

    activateTab(id){
        this.tabs[id].classList.add(`${this.PREFIX}-checked`)
        this.content[id].style.visibility = 'visible'
    }
}