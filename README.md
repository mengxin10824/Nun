## 项目介绍

<p align="center">
  <img src="https://nun.rbq.lu/favicon.ico" alt="Logo" width="96" height="96" />
  <p align="center">一个由 CloudFlare Pages + CloudFlare D1 制作的简易 Demo. <a href="https://nun.rbq.lu">查看网站实例</a></p>
</p>

## 部署教程
由于需要初始化数据库，本项目不能网页端部署。以下是 CLI 部署教程。
1. 克隆仓库，安装 `wrangler` 并登陆 CloudFlare 账号

```
git clone https://github.com/mengxin10824/Nun.git
cd Nun
npm install wrangler
wrangler login
```
2. 创建任意名字的数据库

```
wrangler d1 create <db-name>
```

会出现`[[d1_databases]]`开头的配置信息
复制这个信息，然后在根目录创建如下格式的`wrangler.toml`文件

```
name = "nun" # 项目名称
pages_build_output_dir = "public" # 不要改这个

[[d1_databases]]
binding = "DB" # 不要改这个
database_name = "<db-name>"
database_id = "<db-id>"
```

3. 使用`_init.sql`来初始化数据库表 `RANK`

```
wrangler d1 execute <db-name> --remote --file=./_init.sql
```

4. 部署

```
wrangler pages deploy
```
5. 在 CloudFlare 后台绑定自己的域名（可选）
