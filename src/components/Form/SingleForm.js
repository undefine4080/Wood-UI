import './form.less'
import WDU from '../../WDU'

export default class SingleForm extends WDU {
    constructor(ele) {
        super()
        this.PREFIX = 'wdu-form'
        this.genDom(ele)
        this.setOption(ele)
    }

    genDom(ele) {
        this.formItems = Array.from(ele.querySelectorAll(`.${this.PREFIX} .item`))

        let temp = document.createDocumentFragment()
        this.formItems.forEach(item => {
            item.classList.replace('item', `${this.PREFIX}-item`)
            const label = document.createElement('label')
            label.classList.add(`${this.PREFIX}-label`)
            item.insertBefore(label, item.firstElementChild)

            temp.appendChild(item)
        })

        // 创建表单提交按钮
        temp.appendChild(this.setSubmit(ele))

        ele.appendChild(temp)
    }

    setOption(ele) {
        this.formItems.forEach(item => {
            if(item.dataset.label) {
                const label = item.firstElementChild
                label.innerText = item.dataset.label
                super.wipeOption(item)
            }
        })

        // 是否渲染 重置 表单按钮
        if(ele.dataset.reset) {
            this.setReset(ele)
        }
    }

    setSubmit(ele) {
        const submit = document.createElement('button')
        submit.classList.add('wdu-button','wdu-button-important','wdu-button-medium')
        submit.innerText = '提交'
        submit.addEventListener('click', () => {
            ele.submit()
        })
        const formHandle = super.genHTML([['div', 'handle']])['handle']
        formHandle.appendChild(submit)
        this.formHandle = formHandle
        return formHandle
    }

    setReset(ele) {
        const reset = document.createElement('button')
        reset.classList.add('wdu-button','wdu-button-danger','wdu-button-medium')
        reset.innerText = '重置'
        reset.addEventListener('click', () => {
            ele.reset()
        })
        this.formHandle.appendChild(reset)
    }
}