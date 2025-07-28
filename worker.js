const USERNAME = "admin";
const SESSION_COOKIE_NAME = "auth_session";
const SESSION_TIMEOUT = 3600 * 1000; // 1小时

function getHTML(body = "", loggedIn = false) {
  return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8"/>
<title>ImgBed 图床</title>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f5f5f5;
    color: #333;
    min-height: 100vh;
  }
  @media (prefers-color-scheme: dark) {
    html, body {
      background: #23272e;
      color: #ececec;
    }
  }
  .container {
    width: 98vw;
    max-width: 1250px;
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 40px;
    box-sizing: border-box;
  }
  .login-card {
    max-width: 380px;
    width: 95vw;
    margin: 60px auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 3px 24px rgba(0,0,0,0.1),0 1.5px 3px rgba(0,0,0,0.04);
    padding: 36px 24px 28px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 320px;
  }
  @media (prefers-color-scheme: dark) {
    .login-card {
      background: #23272e;
      box-shadow: 0 3px 24px rgba(0,0,0,0.18),0 1.5px 3px rgba(255,255,255,0.01);
    }
  }
  .login-title {
    font-size: 2em;
    margin-bottom: 26px;
    font-weight: 600;
    letter-spacing: .5px;
    color: #007bff;
    text-align: center;
  }
  .login-card form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .login-card input[type="text"], .login-card input[type="password"] {
    width: 100%;
    border-radius: 8px;
    border: 1.2px solid #ccd;
    padding: 12px 12px;
    font-size: 1.09em;
    background: #f6f8fa;
    transition: border 0.2s;
    box-sizing: border-box;
  }
  .login-card input[type="text"]:focus, .login-card input[type="password"]:focus {
    border: 1.2px solid #007bff;
    outline: none;
    background: #fff;
  }
  @media (prefers-color-scheme: dark) {
    .login-card input[type="text"], .login-card input[type="password"] {
      background: #20242b;
      border: 1.2px solid #444;
      color: #ececec;
    }
    .login-card input[type="text"]:focus, .login-card input[type="password"]:focus {
      background: #23272e;
      border: 1.2px solid #007bff;
    }
  }
  .login-card button {
    width: 100%;
    border-radius: 8px;
    background: #007bff;
    color: #fff;
    font-size: 1.11em;
    font-weight: 600;
    padding: 13px 0;
    margin-top: 8px;
    border: none;
    box-shadow: 0 2px 8px 0 rgba(0,123,255,0.08);
    cursor: pointer;
    letter-spacing: 1px;
    transition: background .2s;
  }
  .login-card button:hover {
    background: #0056b3;
  }
  .upload-card {
    max-width: 420px;
    width: 95vw;
    margin: 40px auto 0 auto;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 3px 24px rgba(0,0,0,0.08);
    padding: 32px 24px 18px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (prefers-color-scheme: dark) {
    .upload-card {
      background: #23272e;
      box-shadow: 0 3px 24px rgba(0,0,0,0.18),0 1.5px 3px rgba(255,255,255,0.01);
    }
  }
  .upload-title {
    font-size: 1.5em;
    margin-bottom: 20px;
    font-weight: 600;
    color: #007bff;
    text-align: center;
  }
  .upload-card form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  .upload-card input[type="file"] {
    width: 100%;
    border-radius: 8px;
    padding: 8px;
    font-size: 1em;
    border: 1px solid #ccd;
    background: #f6f8fa;
  }
  .upload-card button {
    width: 100%;
    border-radius: 8px;
    background: #007bff;
    color: #fff;
    font-size: 1.09em;
    font-weight: 600;
    padding: 11px 0;
    margin-top: 10px;
    border: none;
    box-shadow: 0 2px 8px 0 rgba(0,123,255,0.08);
    cursor: pointer;
    letter-spacing: 1px;
    transition: background .2s;
  }
  .upload-card button:hover {
    background: #0056b3;
  }
  .top-bar {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 18px;
    margin-top: 10px;
  }
  .preview-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    margin: 30px auto 0 auto;
    max-width: 400px;
    width: 100%;
    padding: 16px 14px 10px 14px;
  }
  @media (prefers-color-scheme: dark) {
    .preview-card { background: #23272e; }
  }
  .preview-card img {
    max-width: 100%;
    max-height: 300px;
    margin-bottom: 15px;
    border-radius: 8px;
    background: #f7f7f7;
    box-shadow: 0 1.5px 6px rgba(0,0,0,0.04);
  }
  .copy-row {
    display: flex;
    flex-direction: row;
    gap: 11px;
    width: 100%;
    justify-content: center;
    margin-bottom: 0;
    margin-top: 5px;
  }
  .copy-btn {
    flex: 1 1 0;
    padding: 5px 0;
    font-size: 0.93em;
    border-radius: 6px;
    background: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: background 0.2s;
    font-weight: 500;
    letter-spacing: .5px;
    min-width: 70px;
    max-width: 120px;
  }
  .copy-btn:hover {
    background: #0056b3;
  }

  /* 后台管理样式 */
  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 1100px) {
    .grid-container { grid-template-columns: repeat(4, 1fr);}
  }
  @media (max-width: 900px) {
    .grid-container { grid-template-columns: repeat(3, 1fr);}
  }
  @media (max-width: 700px) {
    .grid-container { grid-template-columns: repeat(2, 1fr);}
  }
  @media (max-width: 500px) {
    .grid-container { grid-template-columns: 1fr;}
  }
  .image-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border-radius: 0;
    box-shadow: none;
    box-sizing: border-box;
    min-width: 0;
    width: 100%;
    max-width: 260px;
    margin: 0 auto;
    padding: 0;
  }
  .image-item img {
    width: 100%;
    max-width: 245px;
    max-height: 180px;
    border-radius: 9px;
    margin-bottom: 11px;
    object-fit: contain;
    background: #f3f3f3;
    box-shadow: 0 2px 12px rgba(0,0,0,0.04);
    display: block;
  }
  .image-btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 7px;
    margin-top: 0;
    justify-content: center;
  }
  .image-btns .copy-btn {
    font-size: 0.82em;
    padding: 4px 0;
    min-width: 57px;
    max-width: 90px;
  }
</style>
</head>
<body>
<div class="container">
${body || `
  ${!loggedIn ? `
    <div class="login-card">
      <div class="login-title">管理员登录</div>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="用户名" required autocomplete="username"/>
        <input type="password" name="password" placeholder="密码" required autocomplete="current-password"/>
        <button type="submit">登录</button>
      </form>
    </div>
  ` : `
    <div class="top-bar">
      <button onclick="location.href='/admin'">进入后台</button>
    </div>
    <div class="upload-card">
      <div class="upload-title">上传图片</div>
      <form id="uploadForm" enctype="multipart/form-data" method="POST" action="/upload">
        <input type="file" name="file" accept="image/*" required/>
        <button type="submit">上传</button>
      </form>
      <div id="preview"></div>
    </div>
    <script>
      function copyText(text, btn) {
        navigator.clipboard.writeText(text).then(() => {
          const old = btn.textContent;
          btn.textContent = '已复制 ✓';
          setTimeout(() => btn.textContent = old, 1500);
        });
      }
      const form = document.getElementById('uploadForm');
      form.addEventListener('submit', async e => {
        e.preventDefault();
        const file = form.file.files[0];
        if (!file) return alert('请选择文件');
        if (file.size > 5*1024*1024) return alert('不能超过 5 MB');
        const img = new Image();
        const reader = new FileReader();
        reader.onload = () => img.src = reader.result;
        reader.readAsDataURL(file);
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const scale = Math.min(1024 / img.width, 1);
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0,canvas.width,canvas.height);
          canvas.toBlob(async blob => {
            const fd = new FormData();
            fd.append('file', new File([blob], file.name, {type:'image/jpeg'}));
            const res = await fetch('/upload',{method:'POST',body:fd});
            const json = await res.json();
            if(json.url){
              const fullUrl = location.origin + json.url;
              // 只保留一张预览图片
              const preview = document.getElementById('preview');
              preview.innerHTML = "";
              const div = document.createElement('div');
              div.className = 'preview-card';
              div.innerHTML = \`
                <img src="\${json.url}" />
                <div class="copy-row">
                  <button class="copy-btn" onclick="copyText('![](\${fullUrl})',this)">复制MD</button>
                  <button class="copy-btn" onclick="copyText('<img src="\${fullUrl}" alt="img" />',this)">复制HTML</button>
                  <button class="copy-btn" onclick="copyText('\${fullUrl}',this)">复制URL</button>
                </div>
              \`;
              preview.append(div);
            } else alert('上传失败');
          }, 'image/jpeg',0.85);
        };
      });
    </script>
  `}
`}
</div>
</body>
</html>`;
}

function getCookie(req){
  const m = (req.headers.get('Cookie')||'').match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  return m? m[1]:null;
}
function setCookie(val){
  return `Set-Cookie: ${SESSION_COOKIE_NAME}=${val}; Path=/; Max-Age=${SESSION_TIMEOUT/1000}; HttpOnly`;
}
function isAuth(req){
  const cookie = getCookie(req);
  if(!cookie) return false;
  try{
    const [user, ts] = atob(cookie).split(':');
    return user===USERNAME && Date.now()-Number(ts)<SESSION_TIMEOUT;
  }catch{return false;}
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const path = url.pathname;

    // 登录 POST
    if(path === '/login' && req.method === 'POST'){
      const fd = await req.formData();
      if(fd.get('username') === USERNAME && fd.get('password') === env.password){
        const cookie = btoa(`${USERNAME}:${Date.now()}`);
        return new Response(null, {status:302, headers:{'Location':'/', 'Set-Cookie':setCookie(cookie)}});
      }
      return new Response(getHTML('<p style="color:red;">登录失败</p>'), {headers:{'Content-Type':'text/html'}});
    }

    // 上传接口
    if(path === '/upload' && req.method === 'POST'){
      if(!isAuth(req)) return new Response('Unauthorized', {status:401});
      const fd = await req.formData();
      const file = fd.get('file');
      if(!file || !file.name) return new Response('No file', {status:400});
      const ext = file.name.split('.').pop().toLowerCase();
      if(!['jpg','jpeg','png','webp'].includes(ext)) return new Response('格式不支持', {status:400});
      if(file.size > 5 * 1024 * 1024) return new Response('文件太大', {status:413});
      const key = `${Date.now()}-${file.name}`;
      await env.r2.put(key, file.stream(), {httpMetadata:{contentType:file.type}});
      return new Response(JSON.stringify({url:`/img/${encodeURIComponent(key)}`}), {headers:{'Content-Type':'application/json'}});
    }

    // 图片访问接口，直接展示不下载
    if(path.startsWith('/img/')){
      const key = decodeURIComponent(path.slice(5));
      const obj = await env.r2.get(key);
      if(!obj) return new Response('Not found', {status:404});
      return new Response(obj.body, {headers:{
        'Content-Type': obj.httpMetadata?.contentType || 'image/jpeg',
        'Content-Disposition': 'inline',
        'Cache-Control': 'public,max-age=31536000'
      }});
    }

    // 后台管理页面
    if(path === '/admin'){
      if(!isAuth(req)) return new Response('Unauthorized', {status:401});
      const list = await env.r2.list();
      const imagesHtml = list.objects.map(obj => {
        const urlPath = `/img/${encodeURIComponent(obj.key)}`;
        const fullUrl = `${url.origin}${urlPath}`;
        return `
          <div class="image-item">
            <img src="${urlPath}" alt="${obj.key}" />
            <div class="image-btns">
              <button class="copy-btn" onclick="copyText('![](${fullUrl})', this)">复制MD</button>
              <button class="copy-btn" onclick="copyText('<img src=&quot;${fullUrl}&quot; alt=&quot;img&quot; />', this)">复制HTML</button>
              <button class="copy-btn" onclick="copyText('${fullUrl}', this)">复制URL</button>
            </div>
          </div>`;
      }).join('');

      const page = `
      <div class="top-bar">
        <button onclick="location.href='/'">返回上传</button>
      </div>
      <h2 style="margin-top:0;">后台管理 - 图片列表</h2>
      <div class="grid-container">
        ${imagesHtml || '<p>暂无图片</p>'}
      </div>
      <script>
        function copyText(text, btn) {
          navigator.clipboard.writeText(text).then(() => {
            const old = btn.textContent;
            btn.textContent = '已复制 ✓';
            setTimeout(() => btn.textContent = old, 1500);
          });
        }
      </script>
      `;

      return new Response(getHTML(page, true), {headers: {'Content-Type': 'text/html'}});
    }

    // 主页，登录或上传页面
    return new Response(getHTML("", isAuth(req)), {
      headers: { "Content-Type": "text/html" }
    });
  }
}
