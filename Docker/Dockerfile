# 使用官方 Node.js 14 镜像作为基础镜像
FROM node:16.18.0

# 设置工作目录
WORKDIR /usr/src/app

# 将 package.json 和 pnpm-lock.yaml 文件复制到工作目录
COPY package*.json pnpm-lock.yaml ./

# 安装pnpm
RUN npm install -g pnpm

# 安装 api-server 微服务的依赖
RUN pnpm install --filter=api-server... --prod --registry=https://registry.npmmirror.com

# 将 api-server 微服务的源代码复制到工作目录
COPY dist/apps/api-server .

# 暴露端口，与 api-server 微服务的端口一致
EXPOSE 1102

# 运行应用
CMD node main.js
