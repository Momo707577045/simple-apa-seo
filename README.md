低成本单页应用 SEO（Simple-Spa-Seo）
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/013.png)

### 背景
- 本项目，低成本预渲染：
  - 非侵入式，无需改动业务代码
  - 屏蔽框架差异，无依赖，单文本实现，直接拷贝粘贴本脚本即可实现功能
  - 简单，开源代码，无编译，脚本代码量仅一百多行，二次集成门槛低，代码清晰易懂
  - 注意本项目仅适合低成本的中小型项目，大型商业项目可参考以下成熟方案
- SSG 预渲染：[Prerender SPA Plugin](https://github.com/chrisvfritz/prerender-spa-plugin)，和本工具类似，但集成了 puppeteer，自动运行项目，截取内容，生产页面元素
- SSR 服务端渲染：[Next.js](https://github.com/vercel/next.js) React 应用程序的服务器渲染框架，[Nuxt.js](https://github.com/nuxt/nuxt) Vue.js 应用程序的服务器渲染框架

![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/014.png)
  

### 效果
- 在指定目录生成与 index.html 为模版的入口文件
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/012.png)

- 在每个入口文件中，实现各自定制的 seo 配置，实现 title、keywords、description 等信息的自定义

![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/003.png)

### 功能
- 【pageLinkNum】自动生成页面间的超链接跳转，实现页面间关联效果，设置为 0 则关闭该功能
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/001.png)

- 【path】需要对外暴露的路径，脚本将自动在相对路径生成对应入口文件。注意，无需刻意携带文件后缀，浏览器会自动尝试解析文件，解析到`<!DOCTYPE html>`为 html
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/006.png)

- 【title】指定页面的 title，`<title>m3u8 downloader</title>`
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/005.png)

- 【keywords】指定页面的 seo 关键字，`<meta name="keywords" content="m3u8 下载工具,毛静文的博客,Momo's Blog">`


- 【description】指定页面的 seo 摘要，`<meta name="description" content="无需后端支持，一个页面即可完成 m3u8 视频下载，遍历下载 ts 碎片，完成 ts 碎片文件整合，生成完整视频文件。">`

- 【img】设置页面的图片，实现搜索引擎收录，展示效果时，展示缩略图
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/010.png)


- 【link】设置页面的超链接跳转，使得搜索引擎的蜘蛛爬虫可以按照超链接找到系统中其他页面的链接，提供相关页面的入口


- 【content】设置页面主体文案内容，使得搜索引擎可匹配关键字
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/011.png)


- 【html】其他自定义标签，提供自定义插入特定 html 代码功能

```
{
    path: '/m3u8-downloader/index.html', // 访问链接
    title: 'm3u8 downloader',
    keywords: "m3u8 下载工具,毛静文的博客,Momo's Blog",
    description: '无需后端支持，一个页面即可完成 m3u8 视频下载，遍历下载 ts 碎片，完成 ts 碎片文件整合，生成完整视频文件。', // 页面描述
    img: [
      'https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader-121-75.jpeg',
      'https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader.jpeg'
    ],
    link: [{
      text: '点击这里跳转',
      href: '/tool-show/nginx-online-config-debug/index.html',
    }],
    content: [{
      tag: 'h1',
      text: '特大视频原格式下载，边下载边保存，彻底解决大文件下载内存不足问题',
    }, {
      tag: 'div',
      text: '推荐一个 m3u8 网页版提取工具，无需下载软件，打开网站即可下载，自动检测，一键下载。',
    }],
    html: `
    页面加载中，请耐心等待...
    <h1 style="white-space: pre;">
      推荐一个 m3u8 网页版提取工具，无需下载软件，打开网站即可下载，自动检测，一键下载。
      工具链接：https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html
      工具教程：https://segmentfault.com/a/1190000021847172?_ea=32289224
      <img src="https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader-121-75.jpeg" alt="m3u8 视频下载工具" title="logo"/>
      <a target="_blank" href="https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html">点击跳转</a>
    </h1>
`,
  }
```

### 用法

- 配置修改
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/008.png)


- 执行脚本，`node seo.js`
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/006.png)


- 集成 package script
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/009.png)
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/002.png)


### [源代码](https://github.com/Momo707577045/simple-apa-seo/blob/main/seo.js)
```
/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const pageLinkNum = 3; // 自动生成页面间的超链接跳转的个数，设置为 0 则关闭该功能
const appendTagId = 'app'; // 页面 seo 元素(超链接，图片，文字等)插入的容器 id
const outputBasePath = path.join(__dirname, 'dist'); // 新建的 seo 入口文件，放在那个文件夹下
const templatePath = path.join(__dirname, 'dist', 'index.html'); // 以那个文件作为模版，一般是 spa 项目的 index.html 文件

// SEO 参考资料：https://github.com/madawei2699/awesome-seo/blob/main/README_CN.md

// 定义数组对象
const pageConfigs = [
  {
    // 参考资料：https://developers.google.com/search/docs/crawling-indexing/url-structure?hl=zh-cn
    path: '/m3u8-downloader/index.html', // 访问链接

    // 页面标题：搜索引擎通常显示页面标题的前 55 至 60 个字符，超出此范围的文本可能会丢失
    // 参考资料：https://developers.google.com/search/docs/appearance/title-link?hl=zh-cn
    // 参考资料：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title#page_titles_and_seo
    title: 'm3u8 downloader',

    // 页面关键字，google 已经弃用该字段
    // https://zhuanlan.zhihu.com/p/382454488
    // https://developers.google.com/search/docs/crawling-indexing/special-tags?hl=zh-cn
    keywords: "m3u8 下载工具,毛静文的博客,Momo's Blog",

    // 页面摘要
    // https://developers.google.com/search/docs/appearance/snippet?hl=zh-cn
    description: '无需后端支持，一个页面即可完成 m3u8 视频下载，遍历下载 ts 碎片，完成 ts 碎片文件整合，生成完整视频文件。', // 页面描述

    // 自定插入的图片
    img: [
      'https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader-121-75.jpeg',
      'https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader.jpeg'
    ],

    // 自定义超链接跳转
    // 参考资料：https://developers.google.com/search/docs/appearance/sitelinks?hl=zh-cn
    link: [{
      text: '点击这里跳转',
      href: '/tool-show/nginx-online-config-debug/index.html',
    }],

    // 自定义插入的标签
    content: [{
      tag: 'h1',
      text: '特大视频原格式下载，边下载边保存，彻底解决大文件下载内存不足问题',
    }, {
      tag: 'div',
      text: '推荐一个 m3u8 网页版提取工具，无需下载软件，打开网站即可下载，自动检测，一键下载。',
    }],

    // 自定义插入的 html
    // 参考资料：https://zhuanlan.zhihu.com/p/391844443
    html: `
    页面加载中，请耐心等待...
    <h1 style="white-space: pre;">
      推荐一个 m3u8 网页版提取工具，无需下载软件，打开网站即可下载，自动检测，一键下载。
      工具链接：https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html
      工具教程：https://segmentfault.com/a/1190000021847172?_ea=32289224
      <img src="https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader-121-75.jpeg" alt="m3u8 视频下载工具" title="logo"/>
      <a target="_blank" href="https://blog.luckly-mjw.cn/tool-show/m3u8-downloader/index.html">点击跳转</a>
    </h1>
`,
  },
];

// 生成页面间随机页面跳转
pageLinkNum && pageConfigs.forEach(config => {
  config.link = config.link || [];
  const pageLinks = [...pageConfigs];
  for (let index = 0; index < Math.min(pageConfigs.length, pageLinkNum); index++) {
    const pageConfig = pageLinks.splice(Math.floor(Math.random() * pageLinks.length), 1)[0];
    config.link.push({ // 自定义插入的标签
      text: pageConfig.title || pageConfig.keywords || pageConfig.description,
      href: pageConfig.path,
    })
  }
})

const appendTagRegex = new RegExp(`(id="${appendTagId}"[^>]*>)`);
const templateStr = fs.readFileSync(templatePath, 'utf8');
pageConfigs.forEach(data => {
  // 读取目标文件内容
  let fileContent = templateStr;

  // 替换 title 标签
  if (data.title) {
    fileContent = fileContent.replace(/<title>.*<\/title>/, `<title>${data.title}</title>`);
  }

  // 替换 meta name="keywords" 标签
  if (data.keywords) {
    fileContent = fileContent.replace(/name="keywords"[^>]+/, `name="keywords" content="${data.keywords}"`);
  }

  // 替换 meta name="description" 标签
  if (data.description) {
    fileContent = fileContent.replace(/name="description"[^>]+/, `name="description" content="${data.description}"`);
  }

  // 插入自定义 html 标签
  if (data.html) {
    fileContent = fileContent.replace(appendTagRegex, `$1\n${data.html}`);
  }

  // 插入 content 标签
  if (data.content) {
    const contentTags = data.content.map(contentConf => typeof contentConf === 'object' ? `\n<${contentConf.tag}>${contentConf.text}</${contentConf.tag}>` : `\n<div>${content}</div>`).join('');
    fileContent = fileContent.replace(appendTagRegex, `$1${contentTags}`);
  }

  // 插入 a 标签，设置超链接跳转
  if (data.link) {
    const aTags = data.link.map(linkConf => `\n<a target="_blank" href="${linkConf.href}">${linkConf.text}</a>`).join('');
    fileContent = fileContent.replace(appendTagRegex, `$1${aTags}`);
  }

  // 插入 img 标签
  if (data.img) {
    const imgTags = data.img.map(imgUrl => `\n<img src="${imgUrl}"/>`).join('');
    fileContent = fileContent.replace(appendTagRegex, `$1${imgTags}`);
  }

  // 将修改后的内容写入目标文件
  const targetPath = path.join(outputBasePath, data.path);
  fs.mkdirSync(targetPath.substring(0, targetPath.lastIndexOf('/')), { recursive: true });
  fs.writeFileSync(targetPath, fileContent, 'utf8');

  console.log(`SEO 入口文件生成：${targetPath}`);
});

```
![](http://upyun.luckly-mjw.cn/Assets/simple-apa-seo/007.png)

### 其他优秀工具推荐
- [tinypng-script 图片压缩工具](https://segmentfault.com/a/1190000024416860)
  - 单文件，单命令完成项目图片视觉无损压缩
  - 自动跳过已压缩文件，脚本运行快

  ![](https://upyun.luckly-mjw.cn/Assets/blog/github-directory-downloader.png)

- [iconfont 在线预览工具](http://blog.luckly-mjw.cn/tool-show/iconfont-preview/index.html)
  - 支持解析本地 ttf 文件，支持解析在线阿里图标资源链接

  ![](https://upyun.luckly-mjw.cn/Assets/blog/iconfont-preview.jpeg)

- [Nginx 在线配置调试工具](http://blog.luckly-mjw.cn/tool-show/nginx-online-config-debug/index.html)
  - Nginx 学习，Nginx 在线配置调试神器，解析各命令运行过程

  ![](https://upyun.luckly-mjw.cn/Assets/blog/nginx-online-config-test.png)

- [git 特定文件夹下载工具](http://blog.luckly-mjw.cn/tool-show/github-directory-downloader/index.html)
  - 复制目标页面链接，直接下载 GitHub 「特定」文件夹或文件(支持特定分支或 tag)。解决 GitHub 只能下载整个项目的问题

  ![](https://upyun.luckly-mjw.cn/Assets/blog/github-directory-downloader.png)