import { SingleCarousel } from './SingleCarousel'

class Carousel {
    constructor(options) {
        this.options = options
        this.PREFIX = 'wood-ui-carousel-'
        this.insertDOM()
        this.initCarousel()

        this.readyContainner.forEach((singleContainner) => {
            new SingleCarousel(singleContainner, this.options)
        })
    }

    // 获取轮播元素
    getCard(singleContainner) {
        const allCards = []
        Array.from(singleContainner.children).forEach((item) => {
            const oneCard = item.parentNode.removeChild(item)
            oneCard.classList.add(`${this.PREFIX}card`)
            allCards.push(oneCard)
        })
        // 提取用户定义的轮播元素
        return allCards
    }

    // 生成轮播DOM结构
    generateDOM(cards) {
        const classNames = ['containner', 'last', 'screen', 'next', 'film', 'pagenation', 'last-btn', 'next-btn', 'pagenation-btn']

        // 轮播图的 DOM结构
        const BOXES = {}

        classNames.forEach(divName => {
            const div = document.createElement('div')
            const boxName = `${this.PREFIX}${divName}`
            div.setAttribute('class', `${this.PREFIX}${divName}`)
            BOXES[boxName] = div
        })

        Array.from(cards).forEach(oneCard => {
            BOXES[`${this.PREFIX}film`].appendChild(oneCard)
        })

        const film = BOXES[`${this.PREFIX}film`]

        const last = BOXES[`${this.PREFIX}last`]
        const lastIcon = document.createElement('i')
        lastIcon.classList.add('iconfont')
        lastIcon.classList.add('icon-xiangzuo-01')
        BOXES[`${this.PREFIX}last-btn`].appendChild(lastIcon)
        last.appendChild(BOXES[`${this.PREFIX}last-btn`])

        const next = BOXES[`${this.PREFIX}next`]
        const nextIcon = document.createElement('i')
        nextIcon.classList.add('iconfont')
        nextIcon.classList.add('icon-xiangyou-01')
        BOXES[`${this.PREFIX}next-btn`].appendChild(nextIcon)
        next.appendChild(BOXES[`${this.PREFIX}next-btn`])

        for (let i = 0; i < cards.length; i++) {
            const temp = BOXES[`${this.PREFIX}pagenation-btn`].cloneNode()
            temp.setAttribute('data-id', i + 1)
            BOXES[`${this.PREFIX}pagenation`].append(temp)
        }

        const pagenation = BOXES[`${this.PREFIX}pagenation`]
        const screen = BOXES[`${this.PREFIX}screen`]
        screen.appendChild(film)
        const CONTAINNER = BOXES[`${this.PREFIX}containner`]

        const finishedDiv = [last, next, pagenation, screen]
        finishedDiv.forEach(div => {
            CONTAINNER.appendChild(div)
        })

        // 返回一个构建好的 轮播图 DOM
        return CONTAINNER
    }

    // 在页面上插入 轮播DOM 结构
    insertDOM() {
        // 获取所有页面容器
        const allContainner = document.querySelectorAll('.wood-ui-carousel')
        Array.from(allContainner).forEach(containner => {
            // 单个容器内的轮播元素
            const singleContainnerCards = this.getCard(containner)

            // 装载完毕的 轮播图
            const realContainner = this.generateDOM(singleContainnerCards)

            // 插入到页面容器上
            containner.appendChild(realContainner)
        })
    }


    // 初始化轮播图的样式
    initCarousel() {
        const Containner = document.querySelectorAll(`.wood-ui-carousel-containner`)
        const Film = []
        const dotSet = []
        for (let i = 0; i < Containner.length; i++) {
            Film.push(Containner[i].querySelector(`.${this.PREFIX}film`))
            dotSet.push(Containner[i].querySelectorAll(`.${this.PREFIX}pagenation-btn`))
        }

        Film.forEach(item => {
            const startClone = item.lastChild.cloneNode(true)
            const endClone = item.firstChild.cloneNode(true)

            // 单个轮播元素的宽度
            this.cardWidth = item.children[0].offsetWidth

            item.insertBefore(startClone, item.firstChild)
            item.appendChild(endClone)
            item.style.left = `${this.cardWidth * -1}px`
        })
        this.readyContainner = Array.from(Containner)
    }
}

export { Carousel }