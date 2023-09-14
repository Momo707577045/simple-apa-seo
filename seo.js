/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const appendTagId = 'app';
const outputBasePath = path.join(__dirname, 'dist');
const templatePath = path.join(__dirname, 'dist', 'index.html');

// 定义数组对象
const dataArray = [
  {
    path: '/xxx/xxx',
    title: 'xxx',
    keywords: 'xxx',
    description: 'xxx',
    img: ['www.baidu.com', 'www.baidu2.com'],
    content: [{
      tag: 'h1',
      text: 'h1',
    }, {
      tag: 'div',
      text: 'divContent',
    }],
    html: '',
  },
  {
    path: 'm/ads-manager/create/google.html',
    title: 'google',
    keywords: 'google',
    description: 'google',
    img: ['www.google.com', 'www.google.com'],
    content: ['google', 'google'],
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
