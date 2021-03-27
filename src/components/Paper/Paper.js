import './paper.less'
import WDU from '../../WDU'

export default class Paper extends WDU{
    constructor () {
        super()
        this.PREFIX = 'wdu-paper'
        this.setOption = this.setOption.bind(this)

        super.init(this.PREFIX, this.setOption)
    }

    setOption(ele) {
        if(ele.dataset.name){
            ele.classList.add(`${this.PREFIX}-${ele.dataset.name}`)
        }
    }
}
