import './button.less'
class Button {
    constructor () {
        this.init()
    }

    /**
     * 初始化Button元素
     * @param {none}
     */
    init() {
        const allButton = Array.from(document.querySelectorAll('.wdu-button'))
        allButton.forEach(btn => {
            this.setOption(btn)
        })
    }

    /**
     * 应用标签配置项
     * @param {Element} ele dom元素
     */
    setOption(ele) {
        const option = JSON.parse(ele.dataset.option)
        ele.classList.add(`w-btn-${option.size}`)
        ele.classList.add(`w-btn-${option.type}`)
        ele.removeAttribute('data-option')
    }
}

export { Button }