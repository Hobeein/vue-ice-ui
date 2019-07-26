<<<<<<< HEAD

# PC-Desktop-Style vue plugin project

> It's a vue plugin project that develops very slow, but still going on.  
> 这是一个PC端桌面风格的vue插件项目，开发进度会非常非常慢   [毕竟只有我一个人  :) ]

> It's a project still under construction, pleace make sure you really want to download before downloading  
> 注意了！目前项目还在摸索和建设中，下载之前先确定你真的想要下载哦！

> github: https://github.com/Hobeein/vue-ice-ui  

## Usage  用法

``` bash

# install vue-ice-ui  
# 如下指令，下载插件

npm i vue-ice-ui

```
``` javascript

// setting in main.js  
// 在main.js中进行如下设置

import Vue from 'vue'
import animateCss from 'animate.css'

Vue.use(animateCss)

```
``` html

<!-- usage in component -->  
<!-- 在组件中使用 -->
<template>
    <div>
        <win10-style-window :identity="index">text in here</win10-style-window>
    </div>
</template>

```

# vue-ice-ui

It's a collection of computer desktop-style plugins for vue  
我励志要将这个项目要做成PC桌面风格的vue UI框架 (日后会慢慢实现的!)