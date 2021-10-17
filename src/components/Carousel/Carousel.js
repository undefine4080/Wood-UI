import WDU from '../../WDU';
import './carousel.less';
class SingleCarousel extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-carousel';
        // 当前组件的DOM对象
        this.ELE = ele;
        // 元素零件
        this.template = null;
        // 轮播时间间隔
        this.time = 5;
        // 是否自动轮播
        this.isAuto = true;
        // 当前显示位置
        this.position = 1;

        this.genDom();
        this.setOption();
        this.getRunningDom();
        this.initFilm();
        this.addEvt();
        this.autoPlay();
        this.protectAutoPlay();
    }

    // 生成组件html
    genDom() {
        // 构建轮播图需要的 dom 元素
        const needHtml = [['div', 'container'], ['div', 'last'], ['div', 'screen'], ['div', 'next'], ['div', 'film'], ['div', 'pagination'], ['div', 'last-btn'], ['div', 'next-btn'], ['i', 'last-btn-icon'], ['i', 'next-btn-icon']];
        const templateElements = super.genHTML(needHtml);
        this.template = templateElements;
        // 装载整个轮播图html
        const carouselDom = this.assembleDom(templateElements);
        this.ELE.appendChild(carouselDom);
    }

    /**
     * 组装 dom 元素
     * 
     * @param  E 模板元素集合
     * @returns 组装好的 dom
     */
    assembleDom(E) {
        // 翻页按钮的图标
        E['last-btn'].appendChild(E['last-btn-icon']);
        E['next-btn'].appendChild(E['next-btn-icon']);
        // 翻页按钮
        E['last'].appendChild(E['last-btn']);
        E['next'].appendChild(E['next-btn']);
        // 轮播元素
        const cards = super.getElementChilds(this.ELE);
        cards.forEach(item => {
            item.setAttribute('class', `${this.PREFIX}-card`);
            E['film'].appendChild(item);
        });

        const startClone = E['film'].lastChild.cloneNode(true);
        const endClone = E['film'].firstChild.cloneNode(true);
        E['film'].insertBefore(startClone, E['film'].firstChild);
        E['film'].appendChild(endClone);

        // 指示器
        const max = cards.length + 1;
        while(cards.length) {
            const e = super.genHTML([['div', 'pagination-btn']]);
            const pageBtn = e['pagination-btn'];
            // 从数字 1 开始
            pageBtn.setAttribute('id', `d-${max - cards.length}`);
            E['pagination'].appendChild(pageBtn);
            cards.length--;
        }
        // 胶片容器
        E['screen'].appendChild(E['film']);
        // 轮播容器
        new Array('last', 'next', 'pagination', 'screen').forEach(item => {
            E['container'].appendChild(E[item]);
        });

        return E['container'];
    }

    setOption() {
        const {time, auto, width, height} = super.getOption(this.ELE);

        // 时间
        if(time && parseInt(time) > 5) {
            this.time = parseInt(time);
        }

        // 是否自动
        if(auto == 'false') {
            this.isAuto = false;
        }

        // 长宽
        if(width) {
            this.ELE.style.width = width;
        } else if(height) {
            this.ELE.style.height = height;
        }
    }

    // 获取组件运行时的dom元素
    getRunningDom() {
        const E = name => {
            return this.ELE.querySelector(`.${this.PREFIX}-${name}`);
        };

        this.Film = E('film');
        this.Next = E('next-btn');
        this.Last = E('last-btn');
        this.Screen = E('screen');
        this.Card = Array.from(this.ELE.querySelectorAll(`.${this.PREFIX}-card`));
        this.cardWidth = this.Card[0].offsetWidth;// 单个轮播元素的宽度
        this.Dot = Array.from(this.ELE.querySelectorAll(`.${this.PREFIX}-pagination-btn`));
        this.toggleSwitch('hidden');
    }

    // 装载事件监听
    addEvt() {
        const play = () => {
            this.play();
            // 切页后重新开始计时
            clearInterval(this.Timer);
            this.autoPlay();
        };
        this.Last.addEventListener('click', () => {
            this.position--;
            play();
        });
        this.Next.addEventListener('click', () => {
            this.position++;
            play();
        });
        this.Dot.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.position = e.target.dataset.id;
                play();
            });
        });

        this.ELE.addEventListener('mouseenter', e => {
            this.toggleSwitch('visible');
            clearInterval(this.Timer);
        });

        this.ELE.addEventListener('mouseleave', e => {
            this.toggleSwitch('hidden');
            this.autoPlay();
        });
    }

    // 设置 film 起始展示位置
    initFilm() {
        this.Film.style.left = `${this.Film.children[0].offsetWidth * -1}px`;
    }

    // 播放轮播图
    play() {
        this.Film.classList.add('wdu-carousel-running');
        this.Film.style.left = `${this.position * -this.cardWidth}px`;
        this.Film.addEventListener('transitionend', () => {
            const checked = `${this.PREFIX}-dot-checked`;

            this.Dot.forEach(item => (item.classList.remove(checked)));

            if(this.position == this.Card.length - 1) {
                this.position = 1;
            } else if(this.position == 0) {
                this.position = this.Card.length - 2;
            }

            try {
                this.Dot[this.position - 1].classList.add(checked);
            } catch(error) {
                this.position = 1;
                this.Dot[this.position].classList.add(checked);
            }

            this.Film.classList.remove('wdu-carousel-running');
            this.Film.style.left = `${this.position * -this.cardWidth}px`;
        });
    }

    // 鼠标移入 显示翻页按钮
    toggleSwitch(flag) {
        this.Last.style.visibility = flag;
        this.Next.style.visibility = flag;
    }

    // 自动播放
    autoPlay() {
        if(this.isAuto) {
            this.Timer = setInterval(() => {
                this.position++;
                this.play();
            }, this.time * 1000);
        }
    }

    // 保护自动播放
    protectAutoPlay() {
        document.addEventListener("visibilitychange", () => {
            if(document.visibilityState == "hidden") {
                clearInterval(this.Timer);
            } else if(document.visibilityState == "visible") {
                this.autoPlay();
            }
        });

        window.οnresize = function() {
            clearInterval(this.Timer);
        };
    }
}

export default class Carousel extends WDU {
    constructor() {
        super();
        this.PREFIX = 'wdu-carousel';
        super.initMult(this.PREFIX, SingleCarousel);
    }
}