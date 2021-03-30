import WDU from '../../WDU'
import SingleNav from './SingleNav'

export default class Nav extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-nav'
        super.initMult(this.PREFIX, SingleNav)
    }
}