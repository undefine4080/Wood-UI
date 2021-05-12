import WDU from '../../WDU'
import SingleSelect from './SingleSelect'

export default class Select extends WDU {
    constructor(){
        super()
        this.PREFIX = 'wdu-select'
        super.initMult(this.PREFIX, SingleSelect)
    }
}