/**
 * 基类
 */
export default class WDU {
    /**
     * 生成所需要的HTML元素
     * 
     * @param elements 二维数组：元素第一项-需要生成的html元素的名称，元素被第二项-生成的html元素的类名
     */
    genHTML(elements) {
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
     * 单实例元素的初始化方法
     * 
     * @param prefix 当前元素类名, 
     * @param exe 需执行的方法
     */
    init(prefix, exe) {
        const all = Array.from(document.querySelectorAll(`.${prefix}`))
        if(all) {
            all.forEach(one => {
                exe(one)
            })
        }
    }

    /**
     * 多实例元素的初始化方法
     * 
     * @param prefix 当前元素类名 
     * @param single 单例组件类
     * @returns allComponentsObj 组件运行时变量集
     */
    initMult(prefix, single) {
        const all = Array.from(document.querySelectorAll(`.${prefix}`))
        const allComponentsObj = []
        all.forEach(one => {
            // 当前组件对象
            const componentObj = new single(one)
            allComponentsObj.push(componentObj)
        })

        return allComponentsObj
    }

    /**
     * 擦除标签上的配置项
     * 
     * @param ele 要擦除配置的元素
     */
    wipeOption(ele) {
        if(ele.dataset) {
            // 将 DOMstring，转为 Object
            const keys = Object.keys(Object.assign({}, ele.dataset))

            keys.forEach(key => {
                ele.removeAttribute(`data-${key}`)
            })
        }
    }

    /**
     * 只取 Element 类型的元素
     * @param element 需要获取子元素集合的元素
     */
    getElementChilds(element) {
        return Array.from(element.childNodes).filter((item) => {
            return item.nodeType == 1
        })
    }

    /**
     * 禁用整个组件的点击事件
     * 
     * @param ele 组件元素
     * @param prefix 组件类名
     */
    disableComponent(ele, prefix) {
        const childs = Array.from(ele.querySelectorAll(`.${prefix} *`))
        childs.forEach(item => {
            item.addEventListener('click', e => {
                e.stopPropagation()
            })
            item.style['cursor'] = 'not-allowed'
        })
    }
}