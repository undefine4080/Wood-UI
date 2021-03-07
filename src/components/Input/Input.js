import './input.less'

class Input {
    constructor () {
        this.PREFIX = 'wdu-input'
        this.init()
    }

    /**
    * 初始化Button元素
    * @param {none}
    */
    init() {
        const all = Array.from(document.querySelectorAll(`.${this.PREFIX}`))
        all.forEach(one => {
            this.genDom(one)
        })
    }

    genDom(ele) {
        const input = document.createElement('input')
        const label = document.createElement('label')
        input.classList.add(`${this.PREFIX}-input`)
        label.setAttribute('class', `${this.PREFIX}-label`)
        ele.appendChild(label)
        ele.appendChild(input)
        this.setOption(ele)
    }

    setOption(ele) {
        const input = ele.lastChild
        const option = JSON.parse(ele.dataset.option)
        if (ele.dataset.input) {
            const inputOption = JSON.parse(ele.dataset.input)
            Object.entries(inputOption).forEach(item => {
                input.setAttribute(item[0],item[1])
            })
        }

        if(option.type){
            input.setAttribute('type',option.type)
        }else{
            input.setAttribute('type',"text")
        }
        
        if(option.size){
            ele.classList.add(`${this.PREFIX}-${option.size}`)
        }else{
            ele.classList.add(`${this.PREFIX}-normal`)
        }

        ele.firstChild.innerText = option.label
        ele.removeAttribute('data-option')
        ele.removeAttribute('data-input')
    }
}

export { Input }