import WDU from '../../WDU'
import SingleCarousel from './SingleCarousel'

export default class Carousel extends WDU {
    constructor () {
        super()
        this.PREFIX = 'wdu-carousel'
        super.initMult(this.PREFIX, SingleCarousel)
    }
}