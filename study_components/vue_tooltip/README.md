## 前言 ##
本文主要介绍toolTip组件的大概框架，提供少量可配置选项，旨在提供思路。

### tooltip ###

常用于展示鼠标hover时的提示信息。

### 模板结构 ###

大致的结构DOM 一个div 包含箭头和气泡内容。
v-bind中可选tooltip位置，是否禁用，及显示隐藏。

slot差值供自定义 默认接收content的内容

### 使用 ###
使用 content 属性决定 click 时的提示信息。
placement属性决定展示效果。

    `
	<ToolTip
      type="type"
      placement="top">
      我是trigger
      <p slot="content">toolTip消息提示</p>
    </ToolTip>

	`

### Attributes ###

- content 显示的内容，也可以通过 slot#content 传入 DOM
- placement Tooltip 的出现位置
- trigger tooltip触发方式