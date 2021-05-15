import WDU from '../../WDU'
import SingleCarousel from './SingleCarousel'

export default class Carousel extends WDU {
    constructor() {
        super()
        this.PREFIX = 'wdu-carousel'
        // 运行时组件变量集
        this.RUN = super.initMult(this.PREFIX, SingleCarousel)
    }

    /** 单个组件元素的重渲染方法
     * 
     * @param {string} id 重渲染的那个组件元素id
     * @param {array} config 配置项
     */
    render(id, config) {
        this.RUN.forEach(item => {
            // 找到了匹配的的组件对象
            if(id === item.ORIGIN.id) {
                // 新增图片或者html
                if(config.type === 'img') {
                    this.insertImg(config.content, item)
                } else if(config.type === 'html') {
                    this.insertHtml(config.content, item)
                }
            }
        })
        // 返回重渲染的组件对象
        return new SingleCarousel(this.renderDom)
    }

    insertImg(imgUrl, item) {
        const {PARENT,ORIGIN,ELEMENT} = item
        debugger

        // 創建 img 元素
        const img = document.createElement('img')
        img.src = imgUrl

        // 将图片插入到组件原始DOM
        ORIGIN.appendChild(img)

        // 移除原来的组件原始DOM， 换上新的组装后的组件原始DOM
        this.refreshDom(PARENT,ORIGIN,ELEMENT)
    }

    insertHtml(html, item) {
        const [, origin, parent, running] = item

        // 创建一个临时的 div 包裹新添加的DOM
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = html

        // 取出新添加的元素，然后溢出临时外壳
        origin.appendChild(tempDiv)
        origin.appendChild(tempDiv.firstElementChild)
        origin.removeChild(tempDiv)

        // 移除原来的组件原始DOM， 换上新的组装后的组件原始DOM
        this.refreshDom(parent, running, origin)
    }

    refreshDom(parent, origin, element) {
        parent.removeChild(element)
        parent.appendChild(origin)
        // 将要被组件类解析的修改好以后的组件原始DOM
        this.renderDom = origin
    }
}