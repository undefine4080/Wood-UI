import WDU from '../../WDU'
import './mark.less'

export default class Mark extends WDU {
    constructor() {
        super()
        this.PREFIX = 'wdu-mark'
        this.setOption = this.setOption.bind(this)
        super.init(this.PREFIX, this.setOption)
    }

    setOption(wduEle) {
        try {
            const {url, type} = JSON.parse(wduEle.dataset.option)
            if(url) {
                this.linkTo(url, wduEle)
            } else if(type) {
                this.setType(type, wduEle)
            }

        } catch(error) {
            console.error(error)
        }
    }

    linkTo(url, wduEle) {
        wduEle.style['cursor'] = 'pointer'
        wduEle.addEventListener('click', () => {
            window.open(url)
        })
    }

    setType(type, wduEle) {
        wduEle.classList.add(`${this.PREFIX}-${type}`)
    }
}