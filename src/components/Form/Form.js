import WDU from '../../WDU'
import SingleForm from './SingleForm'

export default class Form extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-form'
        super.initMult(this.PREFIX, SingleForm)
    }
}