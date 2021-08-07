import WDU from '../../WDU';
import './nav.less';

export default class SingleNav extends WDU {
    constructor(ele) {
        super();
        this.PREFIX = 'wdu-nav';
        this.$ele = ele;
        this.genDom(ele);
        this.setOption();
        this.addEvt();
    }

    genDom(ele) {
        this.menus = super.getElementChilds(ele);
        this.titles = [];
        this.menus.forEach(menu => {
            const E = super.genHTML([['div', 'title'], ['div', 'block']]);
            const navItems = super.getElementChilds(menu);
            navItems.forEach(navItem => {
                E['block'].appendChild(navItem);
            });
            this.titles.push(E['title']);
            menu.insertBefore(E['title'], menu.firstChild);
            menu.appendChild(E['block']);
        });
    }

    setOption() {
        const {fixed} = super.getOption(this.$ele);

        if(fixed) {
            this.$ele.classList.add(`${this.PREFIX}-fixed`);
        }

        this.menus.forEach((item, index) => {
            const {title} = super.getOption(item);
            if(title) {
                this.titles[index].innerText = title;
            }
        });
    }

    addEvt() {
        // 每个展开的子项目 item 的高度
        this.ITEM_HEIGHT = 35;
        // 是否展开标记
        this.isOpen = false;
        this.menus.forEach(menu => {
            menu.addEventListener('mouseenter', e => {
                if(this.isOpen == false) {
                    this.navOpen(e);
                }
            });
            menu.addEventListener('mouseleave', e => {
                if(this.isOpen) {
                    this.navClose(e);
                }
            });
            // 每个选项点击后，收起菜单,并打开超链接
            const items = super.getElementChilds(menu.lastElementChild);
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.linkTo(item);
                    e.target.parentNode.style.height = '0px';
                    this.isOpen = false;
                });
            });
        });
    }

    linkTo(ele) {
        const {current, url} = super.getOption(ele);
        if(current) {
            window.location.href = url;
        } else {
            window.open(url);
        }
    }

    navOpen(e) {
        e.stopPropagation();
        const curBlock = e.target.lastElementChild;
        const curItems = super.getElementChilds(curBlock).length;
        curBlock.style.height = `${this.ITEM_HEIGHT * curItems}px`;
        this.isOpen = true;
    }

    navClose(e) {
        e.stopPropagation();
        const curBlock = e.target.lastElementChild;
        curBlock.style.height = '0px';
        this.isOpen = false;
    }
}