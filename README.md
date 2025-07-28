# r2-img

一个基于 Cloudflare Workers + R2 的简洁图片上传与管理系统。支持图片上传、预览、Markdown/HTML 链接复制和后台管理，适合自用图床。

## 功能特性

- 基于 Cloudflare Workers 和 R2 对象存储实现，无需服务器
- 支持图片（jpg/jpeg/png/webp）上传，最大 5MB
- 支持选择上传路径（自定义文件夹）
- 图片上传后可获得 Markdown、HTML、直链地址一键复制
- 图片自动压缩为不超过 1024px 宽度的 JPEG
- 管理员登录后台，可浏览、分文件夹管理所有图片
- 响应式设计，支持暗色模式
- 所有图片通过 `/img/` 路径直链访问，支持高效缓存

## 快速部署

### 1. 创建 Cloudflare R2 存储桶

1. 进入 Cloudflare Dashboard，创建一个 R2 Bucket（如：`img-bed`）。
2. 生成一个 Access Key 和 Secret Key，记下 Bucket 名和区域。

### 2. 部署 Cloudflare Worker

1. 新建一个 Worker 服务，拷贝本仓库的 `worker.js` 代码到 Worker 编辑器。
2. 在 Worker 的环境变量中配置以下内容：

   - `password`: 管理员登录密码（如：`yourpassword`）

3. 绑定 R2 存储到 Worker（Workers Dashboard → Settings → R2 Integration）。

   - `r2`：绑定R2存储桶变量名称

4. 部署并访问 Worker 域名。

### 3. 使用说明

- **首次访问**：进入首页，输入用户名 `admin` 和你在环境变量设置的密码登录。
- **上传图片**：选择图片文件（支持 jpg/jpeg/png/webp，最大 5MB），可填写上传路径（文件夹）。
- **上传成功**：页面将显示图片预览，并可一键复制 Markdown、HTML 代码或直链。
- **后台管理**：点击“进入后台”可管理所有图片，支持按文件夹浏览、复制链接等操作。

## 代码说明

- 登录采用 Cookie 简单认证，用户名固定为 `admin`，密码由环境变量 `password` 控制。
- 图片上传自动压缩为最大宽度 1024px 的 JPEG 格式，减少空间和流量消耗。
- 支持自定义文件夹（路径），后台可浏览所有文件夹/图片。
- 所有图片通过 `/img/图片路径` 直链访问，支持缓存加速。
- 页面支持暗色/亮色主题自适应。

## 主要接口

- `/`：主页面（未登录显示登录界面，已登录显示上传界面）
- `/login`：POST 登录接口
- `/upload`：POST 上传图片（需登录）
- `/img/xxx`：图片直链访问
- `/admin`：后台管理页面（需登录）

## 注意事项

- **安全提示**：本项目未集成多用户或复杂权限，请勿用于公开场景。
- **Cookie 有效期**：登录后 1 小时失效，需重新登录。
- **最大文件限制**：单张图片最大 5 MB，自动压缩为 JPEG。
- **防注入**：上传路径自动过滤特殊字符。

## License

MIT

---
