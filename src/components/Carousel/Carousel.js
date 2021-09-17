import WDU from '../../WDU'
import './carousel.less';
class SingleCarousel extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-carousel';
        // 当前组件的DOM对象
        this.ELEMENT = ele;
        // 保存一份组件原始DOM的副本
        this.ORIGIN = ele.cloneNode(true);
        // 需要对外提供当前组件的父节点
        this.PARENT = ele.parentNode;
        // 元素零件
        this.E = null;
        // 轮播时间间隔
        this.time = 5;
        // 是否自动轮播
        this.isAuto = true;
        // 当前显示位置
        this.position = 1;

        this.genDom(ele);
        this.setOption(ele);
        this.readyEle(ele);
        this.initFilm();
        this.addEvt(ele);
        this.autoPlay();
        this.protectAutoPlay();
    }

    // 生成组件html
    genDom(ele) {
        // 构建轮播图需要的 dom 元素
        const needHtml = [['div', 'containner'], ['div', 'last'], ['div', 'screen'], ['div', 'next'], ['div', 'film'], ['div', 'pagenation'], ['div', 'last-btn'], ['div', 'next-btn'], ['i', 'last-btn-icon'], ['i', 'next-btn-icon']];

        const Elements = super.genHTML(needHtml);

        this.E = Elements;
        // 装载整个轮播图html
        ele.appendChild(this.assembleDom(ele, Elements));
    }

    /**
     * 组装 dom 元素
     * 
     * @param  ele 每个wdu-carousel元素
     * @param  E div 零件
     * @returns 组装好的 dom
     */
    assembleDom(ele, E) {
        // 翻页按钮的图标
        E['last-btn'].appendChild(E['last-btn-icon']);
        E['next-btn'].appendChild(E['next-btn-icon']);
        // 翻页按钮
        E['last'].appendChild(E['last-btn']);
        E['next'].appendChild(E['next-btn']);
        // 轮播元素
        const cards = super.getElementChilds(ele);
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
            const e = super.genHTML([['div', 'pagenation-btn']]);
            const pageBtn = e['pagenation-btn'];
            // 从数字 1 开始
            pageBtn.setAttribute('id', `d-${max - cards.length}`);
            E['pagenation'].appendChild(pageBtn);
            cards.length--;
        }
        // 胶片容器
        E['screen'].appendChild(E['film']);
        // 轮播图容器
        new Array('last', 'next', 'pagenation', 'screen').forEach(item => {
            E['containner'].appendChild(E[item]);
        });

        return E['containner'];
    }

    setOption(ele) {
        const {time, auto, width, height} = super.getOption(ele);

        // 时间
        if(time && parseInt(time) > 5) {
            this.time = parseInt(time);
        }

        // 是否自动
        if(auto == false) {
            this.isAuto = auto;
        }

        // 长宽
        if(width) {
            ele.style.width = width;
        }

        if(height) {
            ele.style.height = height;
        } else {
            ele.style.height = '280px';
        }
    }

    // 获取需要公共使用的元素
    readyEle(ele) {
        const self = this;
        function E(name) {
            return ele.querySelector(`.${self.PREFIX}-${name}`);
        }

        this.Film = E('film');
        this.Next = E('next-btn');
        this.Last = E('last-btn');
        this.Screen = E('screen');
        this.Card = Array.from(ele.querySelectorAll(`.${this.PREFIX}-card`));
        this.cardWidth = this.Card[0].offsetWidth;
        this.Dot = Array.from(ele.querySelectorAll(`.${this.PREFIX}-pagenation-btn`));
        this.toggleSwitch('hidden');
    }

    // 装载事件监听
    addEvt(ele) {
        this.Last.addEventListener('click', () => {
            this.position--;
            this.play();
        });
        this.Next.addEventListener('click', () => {
            this.position++;
            this.play();
        });
        this.Dot.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.position = e.target.dataset.id;
                this.play();
            });
        });

        ele.addEventListener('mouseenter', e => {
            this.toggleSwitch('visible');
        });

        ele.addEventListener('mouseleave', e => {
            this.toggleSwitch('hidden');
        });

        // 给动态生成的指示器按钮加事件监听
        this.Dot.forEach(dot => {
            dot.addEventListener('click', (e) => {
                this.position = parseInt(e.target.id.charAt(2));
                this.play();
            });
        });
    }

    // 设置 film 起始展示位置
    initFilm() {
        this.Film.style.left = `${this.Film.children[0].offsetWidth * -1}px`;
    }

    // 播放轮播图
    play() {
        this.Film.style.transition = 'all 0.5s ease-in-out';
        this.Film.style.left = (this.position) * -this.cardWidth + "px";

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

            this.Film.style.transition = "";
            this.Film.style.left = (this.position) * -this.cardWidth + "px";
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
        super()
        this.PREFIX = 'wdu-carousel'
        // 运行时组件变量集
        this.RUN = super.initMult(this.PREFIX, SingleCarousel)
    }

    /** 单个组件元素的重渲染方法
     * 
     * @param {string} id 重渲染的那个组件元素id
     * @param {array} config 配置项
     */
    render(id, config) {
        this.RUN.forEach(item => {
            // 找到了匹配的的组件对象
            if(id === item.ORIGIN.id) {
                // 新增图片或者html
                if(config.type === 'img') {
                    this.insertImg(config.content, item)
                } else if(config.type === 'html') {
                    this.insertHtml(config.content, item)
                }
            }
        })
        // 返回重渲染的组件对象
        return new SingleCarousel(this.renderDom)
    }

    insertImg(imgUrl, item) {
        const {PARENT,ORIGIN,ELEMENT} = item
        debugger

        // 創建 img 元素
        const img = document.createElement('img')
        img.src = imgUrl

        // 将图片插入到组件原始DOM
        ORIGIN.appendChild(img)

        // 移除原来的组件原始DOM， 换上新的组装后的组件原始DOM
        this.refreshDom(PARENT,ORIGIN,ELEMENT)
    }

    insertHtml(html, item) {
        const [, origin, parent, running] = item

        // 创建一个临时的 div 包裹新添加的DOM
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = html

        // 取出新添加的元素，然后溢出临时外壳
        origin.appendChild(tempDiv)
        origin.appendChild(tempDiv.firstElementChild)
        origin.removeChild(tempDiv)

        // 移除原来的组件原始DOM， 换上新的组装后的组件原始DOM
        this.refreshDom(parent, running, origin)
    }

    refreshDom(parent, origin, element) {
        parent.removeChild(element)
        parent.appendChild(origin)
        // 将要被组件类解析的修改好以后的组件原始DOM
        this.renderDom = origin
    }
}