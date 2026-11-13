# incimathcal.github.io

IncimathCal 的个人主页：Astro 静态生成，GitHub Pages 托管（GitHub Actions 构建）。

访问地址：<https://incimathcal.github.io>

## 本地开发

需要 Node ≥ 22.23.4（本机已用 Node 26 LTS 验证）。

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
npm run preview  # 本地预览构建产物
```

## 写内容

- 文章放 `src/content/articles/*.md`，作品放 `src/content/works/*.md`
- frontmatter 字段定义见 `src/content.config.ts`
- **文件名即 URL slug**（英文连字符命名）
- `externalUrl` 有值 → 外链卡（整卡新标签跳转，不生成详情页）；无值 → 本站详情页
- `pinned` / `order` 可控制置顶与主页第三栏自定义排序
- 主页 Blog / Works 各展示最近 15 条，其余在 `/articles/`、`/works/`
- 平台 logo 目前是占位图形，集中在 `src/components/PlatformIcon.astro` 一处替换
- 封面图：frontmatter `cover` 填 `public/` 下的图片路径；缺省自动用渐变占位
- 改视觉主题只动 `src/styles/global.css` 顶部的 `:root` 变量

## 部署

推送到 `main` → GitHub Actions 自动构建并发布（`.github/workflows/deploy.yml`）。
仓库 Settings → Pages → Build and deployment → Source 必须为 **GitHub Actions**。
