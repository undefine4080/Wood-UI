import WDU from '../../WDU'
import SingleTextarea from './SingleTextarea'

export default class Textarea extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-textarea'
        super.initMult(this.PREFIX, SingleTextarea)
    }
}