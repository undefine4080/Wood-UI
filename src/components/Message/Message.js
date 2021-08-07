import './message.less';

export default function Message(config) {
    // 构造dom元素
    const PREFIX = 'wdu-message';
    const needHtml = [['div', 'mask'], ['div', 'close'], ['div', 'title'], ['div', 'content']];
    const E = {};
    needHtml.forEach((item) => {
        let element = document.createElement(item[0]);
        element.setAttribute('class', `${PREFIX}-${item[1]}`);
        E[item[1]] = element;
    });

    // 组装dom结构
    const component = E['mask'];
    const message = document.createElement('div');
    message.setAttribute('class', PREFIX);

    // 应用配置项
    const {autoClose, title, content} = config;

    // 自动关闭还是手动关闭
    if(!autoClose) {
        // 绑定事件监听
        E['close'].addEventListener('click', () => {
            component.style.display = 'none';
            event();
        });
        message.appendChild(E['close']);
    } else {
        setTimeout(() => {
            component.style.display = 'none';
        }, autoClose * 1000);
    }
    // 是否设置标题
    if(title) {
        E['title'].innerText = title;
        E['content'].style.height = '200px';
        message.appendChild(E['title']);
    } else {
        E['content'].style.height = '100%';
    }
    // 是否设置消息内容
    if(content) {
        E['content'].innerText = content;
        message.appendChild(E['content']);
    }


    // 挂载到页面
    component.appendChild(message);
    document.body.appendChild(component);
}