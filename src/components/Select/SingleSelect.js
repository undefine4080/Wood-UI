import WDU from '../../WDU'
import './select.less'

export default class SingleSelect extends WDU {
    constructor(ele) {
        super()
        this.PREFIX = 'wdu-select'
        this.isOn = false
        this.genDom(ele)
        this.addEvt()
        this.setOption(ele)
    }

    genDom(ele) {
        // 通过 ul、li、span组合的方式来模拟一个 select
        const needHtml = [['ul', 'select'], ['span', 'title'], ['label', 'label'], ['div', 'container']]
        const E = super.genHTML(needHtml)
        // 下拉列表
        const ul = E['select']
        this.select = ul
        // 下拉选择的标签文字
        this.label = E['label']
        // 下拉列表容器
        this.container = E['container']
        // 选中项
        this.title = E['title']
        ul.appendChild(E['title'])

        // 原始 option 
        const rawOptions = Array.from(ele.querySelectorAll('option'))
        rawOptions.forEach((option) => {
            const li = document.createElement('li')
            li.classList.add(`${this.PREFIX}-option`)
            li.innerText = option.innerText
            ul.appendChild(li)
        })
        this.rawOptions = rawOptions
        // title 的内容默认为第一项
        this.title.innerText = rawOptions[0].innerText
        // 隐藏原生 select
        ele.style['display'] = 'none'
        // 挂载新 select 到 dom 中
        this.container.appendChild(this.label)
        this.container.appendChild(this.select)
        ele.parentNode.appendChild(this.container)
    }

    addEvt() {
        const select = this.select
        const lis = select.querySelectorAll('li')
        // select 的标题事件
        this.title.addEventListener('click', (e) => {
            e.stopPropagation()
            if(this.isOn) {
                this.closeSelect()
            } else {
                this.openSelect(lis)
            }
        })

        // li 点击事件关联到option
        lis.forEach((li, index) => {
            li.addEventListener('click', (e) => {
                e.stopPropagation()
                this.selectOption(li, index)
            })
        })
    }

    setOption(ele) {
        if(ele.dataset.label) {
            this.label.innerText = ele.dataset.label
        }
        super.wipeOption(ele)
    }

    closeSelect() {
        this.select.style['height'] = '40px'
        this.isOn = false
    }

    openSelect(lis) {
        this.select.style['height'] = `${(lis.length + 1) * 40}px`
        this.isOn = true
    }

    selectOption(selected, index) {
        this.title.innerText = selected.innerText
        this.closeSelect()
        this.rawOptions[index].selected = true
    }
}