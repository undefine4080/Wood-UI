// 接管单个轮播图的自动播放
class SingleCarousel {
    constructor(carousel, option) {
        this.initElement(carousel, option)
        this.initButton()
        try {
            this.autoPlay()
        } catch (error) {
            this.autoPlay()
        }

        this.protectPlay()
    }

    initElement(carousel, option) {
        this.option = option
        this.position = 1
        this.PREFIX = '.wood-ui-carousel-'
        this.carousel = carousel
        this.Film = this.carousel.querySelector(`${this.PREFIX}film`)
        this.Card = Array.from(this.carousel.querySelectorAll(`${this.PREFIX}card`))
        this.cardWidth = this.Card[0].offsetWidth
        this.Dot = Array.from(this.carousel.querySelectorAll(`${this.PREFIX}pagenation-btn`))
        this.Next = this.carousel.querySelector(`${this.PREFIX}next-btn`)
        this.Last = this.carousel.querySelector(`${this.PREFIX}last-btn`)
        this.Screen = this.carousel.querySelector(`${this.PREFIX}screen`)
        this.toggleSwitch('hidden')
    }

    initButton() {
        this.Last.addEventListener('click', () => {
            this.position--
            this.play()
        })
        this.Next.addEventListener('click', () => {
            this.position++
            this.play()
        })
        this.Dot.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.position = e.target.dataset.id
                this.play()
            })
        })
        this.carousel.onmouseenter = () => {
            clearInterval(this.timer)
            this.toggleSwitch('visible')
        }
        this.carousel.onmouseleave = () => {
            this.toggleSwitch('hidden')
            this.autoPlay()
        }
    }

    toggleSwitch(flag) {
        this.Last.style.visibility = flag
        this.Next.style.visibility = flag
    }

    play() {
        this.Film.style.transition = 'all 0.5s ease-in-out'
        this.Film.style.left = (this.position) * -this.cardWidth + "px"

        this.Film.addEventListener('transitionend', () => {
            this.Dot.forEach(item => (item.classList.remove(`wood-ui-carousel-dot-checked`)))
            if (this.position == this.Card.length - 1) {
                this.position = 1
            } else if (this.position == 0) {
                this.position = this.Card.length - 2
            }
            try {
                this.Dot[this.position - 1].classList.add(`wood-ui-carousel-dot-checked`)
            } catch (error) {
                this.position = 1
                this.Dot[this.position].classList.add(`wood-ui-carousel-dot-checked`)
            }

            this.Film.style.transition = ""
            this.Film.style.left = (this.position) * -this.cardWidth + "px"
        })
    }

    autoPlay() {
        this.timer = setInterval(() => {
            this.position++
            this.play()
        }, this.option.time)
    }

    protectPlay() {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState == "hidden") {
                clearInterval(this.timer)
            } else if (document.visibilityState == "visible") {
                this.autoPlay()
            }
        })
    }
}

export { SingleCarousel }