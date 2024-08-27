## 项目介绍
一个由 CloudFlare Pages + CloudFlare D1 制作的简易 Demo.

## 部署教程
1. 安装 `wrnagler` 并登陆 CloudFlare 账号
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
会出现`[[d1_databases]]`开头的配置文件
复制这个文件，然后配置如下格式`wrangler.toml`文件
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
wrangler deploy
```
5. 在 CloudFlare 后台绑定自己的域名（可选）