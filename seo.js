/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const appendTagId = 'app';
const outputBasePath = path.join(__dirname, 'dist');
const templatePath = path.join(__dirname, 'dist', 'index.html');

// 定义数组对象
const dataArray = [
  {
    path: '/tool-show/m3u8-downloader/index.html',
    title: 'm3u8 downloader',
    keywords: "m3u8 下载工具,毛静文的博客,Momo's Blog",
    description: '无需后端支持，一个页面即可完成 m3u8 视频下载，遍历下载 ts 碎片，完成 ts 碎片文件整合，生成完整视频文件。',
    img: [
      'https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader-121-75.jpeg',
      'https://upyun.luckly-mjw.cn/Assets/blog/m3u8-downloader.jpeg'
    ],
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
  },
  {
    path: '/tool-show/nginx-online-config-debug/index.html',
    title: 'Nginx Online Debug',
    keywords: "nginx 在线配置调试工具",
    description: "Nginx online config debug,Nginx 在线配置调试,Nginx 调试,Nginx 解析过程,Momo's Blog, LuckyMomo",
    img: [
      'https://upyun.luckly-mjw.cn/Assets/blog/nginx-online-config-test.png'
    ],
    content: [{
      tag: 'h1',
      text: 'location 配置',
    }, {
      tag: 'button',
      text: 'access.log（内置变量）',
    }],
    html: `
    <h1 style="white-space: pre;">
    NGINX 在线配置调试工具,Nginx online config debug,Nginx 在线配置调试,Nginx 调试,Nginx 解析过程
    工具链接：https://blog.luckly-mjw.cn/tool-show/nginx-online-config-debug/index.html
    <img src="https://upyun.luckly-mjw.cn/Assets/blog/nginx-online-config-debug.png" alt="NGINX 在线配置调试工具"
      title="logo" />
    <a target="_blank" href="https://blog.luckly-mjw.cn/tool-show/nginx-online-config-debug/index.html">点击跳转</a>
  </h1>
`,
  },
  {
    path: '/tool-show/github-directory-downloader/index.html',
    title: 'GitHub directory downloader',
    keywords: "GitHub directory for web",
    description: "GitHub directory downloader for web, Momo's Blog, LuckyMomo",
    img: [
      'https://upyun.luckly-mjw.cn/Assets/blog/github-directory-downloader.png',
    ],
    content: [{
      tag: 'h1',
      text: '测试链接：https://github.com/Momo707577045/m3u8-downloader/tree/master/imgs',
    }, {
      tag: 'div',
      text: '支持特定分支，特定 tags 下的文件夹或具体文件，解决 GitHub 只能下载整个项目的问题。直接拷贝当前页面链接至本页面，点击下载',
    }],
    html: `
    <div class="m-p-retry" v-if="errorNum && downloadIndex >= fileInfoList.length" @click="retryAll">重新下载错误文件</div>
    <div class="m-p-force" v-if="finishNum" @click="forceDownload">强制下载现有文件</div>
    <div class="m-p-tips">碎片总量：{{ fileInfoList.length }}，已下载：{{ finishNum }}，错误：{{ errorNum }}，进度：{{ (finishNum / fileInfoList.length * 100).toFixed(2) }}%</div>
    <div class="m-p-tips">若某视频碎片下载发生错误，将标记为红色，可点击相应图标进行重试</div>
    <section class="m-p-segment">
      <div class="item" v-for="(item, index) in fileInfoList" :class="[item.status]" @click="retry(index)" :title="item.path">
        <div class="status"></div>
        <div class="content"><span>{{ index + 1 }}</span> {{ item.absoluteUrl }}</div>
      </div>
    </section>
`,
  },
  {
    path: '/tool-show/iconfont-preview/index.html',
    title: 'Iconfont Preview',
    keywords: "iconfont preview for web",
    description: "iconfont preview for web, Momo's Blog, LuckyMomo",
    img: [
      'https://upyun.luckly-mjw.cn/Assets/blog/iconfont-preview.jpeg',
    ],
    content: [{
      tag: 'h1',
      text: '解析本地 ttf、woff、otf 文件',
    }, {
      tag: 'div',
      text: '请选择字体文件源',
    }],
    html: `
    功能简介
iconfont web 在线预览工具，无需安装，打开即用。
可预览本地 ttf 文件中定义的所有 icon。
也支持预览 阿里iconfont 中的三种模式，unicode，Font class，Symbol。根据在线字体链接即可解析预览其定义的所有icon。
`,
  },
  
];

const appendTagRegex = new RegExp(`(id="${appendTagId}"[^>]*>)`);
const templateStr = fs.readFileSync(templatePath, 'utf8');
dataArray.forEach(data => {
  // 读取目标文件内容
  let fileContent = templateStr;

  // 替换 title 标签
  if (data.title) {
    fileContent = fileContent.replace(/<title>.*<\/title>/, `<title>${data.title}</title>`);
  }

  // 替换 meta name="keywords" 标签
  if (data.keywords) {
    fileContent = fileContent.replace(/name="keywords"[^>]+/, `name="keywords" content="${data.keywords}">`);
  }

  // 替换 meta name="description" 标签
  if (data.description) {
    fileContent = fileContent.replace(/name="description"[^>]+/, `name="description" content="${data.description}">`);
  }

  // 插入自定义 html 标签
  if (data.html) {
    fileContent = fileContent.replace(appendTagRegex, `$1${data.html}`);
  }

  // 插入 content 标签
  if (data.content) {
    const contentTags = data.content.map(content => typeof content === 'object' ? `<${content.tag}>${content.text}</${content.tag}>` : `<div>${content}</div>`).join('');
    fileContent = fileContent.replace(appendTagRegex, `$1${contentTags}`);
  }


  // 插入 img 标签
  if (data.img) {
    const imgTags = data.img.map(imgUrl => `<img src="${imgUrl}">`).join('');
    fileContent = fileContent.replace(appendTagRegex, `$1${imgTags}`);
  }

  // 将修改后的内容写入目标文件
  const targetPath = path.join(outputBasePath, data.path);
  fs.mkdirSync(targetPath.substring(0, targetPath.lastIndexOf('/')), { recursive: true });
  fs.writeFileSync(targetPath, fileContent, 'utf8');

  console.log(`File generated at ${targetPath}`);
});
