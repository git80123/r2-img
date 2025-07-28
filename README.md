# r2-img

一个基于 Cloudflare Workers + R2 的简洁图片上传与管理系统。支持图片上传、预览、Markdown/HTML 链接复制和后台管理，适合自用图床。

## 功能特性

- 管理员登录，简单安全
- 图片上传自动压缩与格式校验，支持 JPG/JPEG、PNG、WebP
- 上传图片预览与多种格式复制（Markdown、HTML、直链）
- 后台管理所有已上传图片
- 支持移动端和暗黑模式

---

## 在线演示

> 请根据实际情况自行部署

---

## 部署到 Cloudflare

### 1. 前置条件

- 拥有 [Cloudflare 账号](https://dash.cloudflare.com/)
- 已开通 [R2 存储](https://dash.cloudflare.com/?to=/:account/r2)
- 安装 [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/get-started/)  
  ```bash
  npm i -g wrangler
  
  - 已 fork 或 clone 本项目源码
  ### 2. 创建 R2 Bucket
  1. 进入 Cloudflare Dashboard，选择 R2，创建一个新的 Bucket，例如 img-bed
  2. 记下 Bucket 名称，后续 wrangler 配置需要用到
  ### 3. 配置 wrangler.toml
在项目根目录新建或编辑 wrangler.toml 文件：
name = "r2-img"
main = "worker.js"
compatibility_date = "2024-05-01"

[[r2_buckets]]
binding = `r2`
bucket_name = "img-bed"     # 这里填写你实际创建的 R2 bucket 名称

[vars]
`password` = "你的管理密码"    # 强烈建议设置一个复杂密码

- binding 必须为 r2，与代码一致
- bucket_name 替换为你实际创建的 R2 存储桶名称
- password 替换为你自己的管理密码
### 4. 部署到 Cloudflare
在终端执行：
```
wrangler deploy
```
首次部署会提示授权，按提示操作即可。
### 5. 访问与使用
部署成功后，终端会显示你的 Cloudflare Workers 地址，例如：
```
https://r2-img.<你的子域>.workers.dev
```
使用浏览器访问该地址即可看到登录界面。登录后即可上传、管理图片。
## 常见问题
### 如何修改管理员用户名或其它配置？
- 管理员用户名在 worker.js 文件顶部 USERNAME 常量定义，默认为 admin，如需修改请自行更改并重新部署。
### 支持哪些图片格式和大小？
- 支持 jpg/jpeg、png、webp，单文件最大 5MB。
### 如何自定义域名？
- 可在 Cloudflare Workers 的“自定义域”中进行绑定，详见 [官方文档](https://developers.cloudflare.com/workers/platform/domains/)

---
### 鸣谢
- 基于 Cloudflare Workers & R2
- UI 部分参考了现代简洁风格
---
## License
MIT
