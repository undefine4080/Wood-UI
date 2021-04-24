import './box.less'
import WDU from '../../WDU'

export default class Box extends WDU{
    constructor(){
        super()
        this.RREFIX = 'wdu-box'
        this.setOption = this.setOption.bind(this)
        super.init(this.RREFIX, this.setOption)
    }

    setOption(ele){
        if(ele.dataset.hover){
            ele.classList.add(`${this.RREFIX}-hover`)
        }
    }
} 