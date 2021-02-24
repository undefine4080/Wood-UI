/**
 * 基类
 */
class WDU {
    /**
     * @param {classNames} 需要生成的 html 的标签名
     * 返回值：生成好的标签
     */
    genBoxes(classNames){
        let BOXES = {}

        classNames.forEach(divName => {
            const div = document.createElement('div')
            const boxName = `${this.PREFIX}${divName}`
            div.setAttribute('class', `${this.PREFIX}$-{divName}`)
            BOXES[boxName] = div
        })

        return BOXES
    }
}

export {WDU}