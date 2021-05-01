import './main.less'

import Button from './components/Button/Button'
import Radio from './components/Radio/Radio'
import Checkbox from './components/Checkbox/Checkbox'
import Card from './components/Card/Card'
import Input from './components/Input/Input'
import Switch from './components/Switch/Switch'
import Carousel from './components/Carousel/Carousel'
import Tab from './components/Tab/Tab'
import Collapse from './components/Collapse/Collapse'
import Paper from './components/Paper/Paper'
import Nav from './components/Nav/Nav'
import Message from './components/Message/Message'
import Mark from './components/Mark/Mark'
import Box from './components/Box/Box'

window.wdu = {
    Button: new Button(),
    Box: new Box(),
    Mark: new Mark(),
    Radio: new Radio(),
    Checkbox: new Checkbox(),
    Card: new Card(),
    Input: new Input(),
    Switch: new Switch(),
    Carousel: new Carousel(),
    Tab: new Tab(),
    Collapse: new Collapse(),
    Paper: new Paper(),
    Nav: new Nav(),
    Message: Message
}
