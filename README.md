# API 文档自动化输出工具

> 一键自动化输出说明文档

- ✨ 脚本可按指定 handlebars 模版输出
  - 通过配置 docs-config.js
- ✨ 使用 [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown/) 的自定义格式化功能
  - 通过创建 partial 覆盖

## 使用

```dash
# 在项目目录下运行
> $ npm run docs
```

输出文档内容位于`/docs`。

## 约定

- `cli/` API 文档自动化输出工具
- `cli/partial/` partial 文件存放目录
- `docs-config.js` 文档输出配置
- `template/` 文档模版，仅支持 handlebars 模版（`.hbs`)
- `docs/` 文档输出目录
- `src/` 脚本存放目录，其一个子目录对应一个输出 API 文档

## 配置

### 创建 partial

> 创建 partial 可以自定义 [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown/) 的输出模版。

在 `/partial` 目录创建相关的配置，具体配置实现参考官方文档：[Create a custom partial](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/Create-a-custom-partial)。

**注意点：partial 是通过文件同名覆盖的，否则是以官方为准输出。**

### 配置 docs-config.js

```js
module.exports = [
  {
    name: "sdk-mobile", // 目录名
    template: "sdk-mobile-template.hbs", // 对应文档模版
    docsFiles:[ //  指定输出哪几个脚本，脚本内通过 JSDocs 进行注释
      {
        id: "fetch", // 自定义 ID
        title: "数据拉取", // 自定义标题
        file: "fetch-material.js", // 对应脚本文件名
      },
      // ...
    ]
  }
]
```

## 配置 .hbs

> [什么是 handlebars?](http://handlebarsjs.com)

目前支持的自定义 helper 指令

```js
{{#docs}}
  {{{id}}} // 自定义 ID
  {{{title}}} // 自定义标题
  {{{index}}} // API 文档索引块
  {{{intro}}} // API 文档说明块
{{/docs}}
```

## Todos

- 通过交互式命令或继续优化 docs-config.js 进行优化一些自定义配置

## 相关库

- [Handlebars](https://github.com/wycats/handlebars.js/)
- [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown/)

## 开源协议

MIT