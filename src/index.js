import './main.less';

import Button from './components/Button/Button';
import Radio from './components/Radio/Radio';
import Checkbox from './components/Checkbox/Checkbox';
import Card from './components/Card/Card';
import Input from './components/Input/Input';
import Switch from './components/Switch/Switch';
import Carousel from './components/Carousel/Carousel';
import Tab from './components/Tab/Tab';
import Collapse from './components/Collapse/Collapse';
import Paper from './components/Paper/Paper';
import Nav from './components/Nav/Nav';
import Message from './components/Message/Message';
import Mark from './components/Mark/Mark';
import Box from './components/Box/Box';
import Select from './components/Select/Select';
import Textarea from './components/Textarea/Textarea';
import Form from './components/Form/Form';
import Tips from './components/Tips/Tips';
import WDU from './WDU';

class Core extends WDU {
    constructor() {
        super();
        this.Button = new Button();
        this.Box = new Box();
        this.Mark = new Mark();
        this.Radio = new Radio();
        this.Checkbox = new Checkbox();
        this.Card = new Card();
        this.Input = new Input();
        this.Switch = new Switch();
        this.Carousel = new Carousel();
        this.Tab = new Tab();
        this.Collapse = new Collapse();
        this.Paper = new Paper();
        this.Nav = new Nav();
        this.Select = new Select();
        this.Textarea = new Textarea();
        this.Form = new Form();
        this.Message = Message;
        this.Tips = new Tips();
    }
}

window.wdu = new Core();


