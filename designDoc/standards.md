# 目录结构
+ designDoc 系统设计文档

+ src 主文件目录
  - components 全部组件目录
    - compnent 组件
      - component.js 组件主文件
      - component.less 组件样式文件
      - assets 组件静态资源
  - index.js 系统主文件
  - main.less 公共样式文件
  - style 系统样式模块
    - animate.less  动画模块
    - shadow.less  阴影模块
    - color.less  颜色模块
    - font.less 字体模块
    - layout.less  布局模块
    - border.less  边框模块
  - assets 公共静态资源

+ webpack webpack配置文件
  - webpack.dev.js 开发环境配置文件
  - webpack.pro.js 生产环境配置文件

+ README.md 项目说明文档

+ doc 系统使用说明文档



# 代码规范与命名规范

## HTML规范
 + 所有配置项都通过 `data-option` 属性传入

## CSS 规范
 + BEM 命名模式，使用 `-` 分隔
 + 主类名：`wdu`，接后缀，如 `Button` 组件就为 `wdu-button`
  
## Javascript 规范
 + 变量和方法命名采用 `camelCase` 模式，不超过10个字母，如 `renderDom`
 + 类的首字母大写，且每个单词的首字母也大写，如 `MultipleSelect`
 + 常量使用全大写字母和下划线命名，如 `DEFAULT_OPTION`
 + 使用 `@param` 注解，并写明每个方法的作用、入参解释、返回值解释
 
## 组件规范
 + 组件的名称与组件的类名相同，如 `Button.js` 
 + 组件样式文件命名为组件类名的小写形式并用短线分隔，如 `multiple-select.less`

## 版本控制规范
 + 完成一个方法，就生成一次 `小提交`
 + 完成一个组件时，将所有小提交合并为一次 `大提交`
 + 完成所有公共样式以及公共类时，打上 `tag`
 + 完成一个样式模块时，生成一次 `小提交`
 + 所有对已有代码的修改，都采用 `--amend` 方式提交

## bug
 + 新建分支 `【bugfix-问题名称】`，在此分支上修复bug，完成后合并到 `master` 分支，并删除源分支
 + bug的commit message里，要写明：问题发生的原因、问题造成的后果、问题的解决方式