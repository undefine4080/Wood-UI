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
}

export {WDU}