import WDU from '../../WDU'
import SingleTab from './SingleTab'

export default class Tab extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-tab'
        super.initMult(this.PREFIX, SingleTab)
    }
}