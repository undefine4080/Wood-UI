import WDU from '../../WDU'
import SingleCollapse from './SingleCollapse'

export default class Collapse extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-collapse'
        super.initMult(this.PREFIX, SingleCollapse)
    }
}