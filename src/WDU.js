/**
 * 基类
 */
class WDU {
    /**
     * 生成所需要的HTML元素
     * 
     * @param {Array} classNames 需要生成的 div 的类名 
     */
    genBoxes(classNames){
        let BOXES = {}

        classNames.forEach(divName => {
            const div = document.createElement('div')
            const boxName = `${divName}`
            div.setAttribute('class', `${this.PREFIX}-${divName}`)
            BOXES[boxName] = div
        })

        return BOXES
    }

    /**
     * 
     * @param {string} prefix 当前元素类名
     * @param {function} exe 需执行的方法
     */
    init(prefix, exe) {
        const all = Array.from(document.querySelectorAll(`.${prefix}`))
        all.forEach(one => {
            exe(one)
        })
    }
}

export {WDU}