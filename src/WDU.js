/**
 * 基类
 */
class WDU {
    /**
     * 生成所需要的HTML元素
     * 
     * @param {Array} elements elements元素中：第一项-需要生成的html元素的名称，第二项-生成的html元素的类名
     */
    genHTML(elements){
        let BOXES = {}

        elements.forEach(element => {
            const boxName = element[1]
            const ele = document.createElement(element[0])
            const className = element[1]
            ele.setAttribute('class', `${this.PREFIX}-${className}`)
            BOXES[boxName] = ele
        })

        return BOXES
    }

    /**
     * 单例元素的初始化方法
     * 
     * @param prefix 当前元素类名, 
     * @param exe 需执行的方法
     */
    init(prefix, exe) {
        const all = Array.from(document.querySelectorAll(`.${prefix}`))
        all.forEach(one => {
            exe(one)
        })
    }
}

export {WDU}