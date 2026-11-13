import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 第二栏 Blog：站内文章与外部平台（公众号/知乎/B站视频等）混排
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    cover: z.string().optional(),               // 封面图路径，如 /images/covers/xxx.svg；缺省用渐变占位
    externalUrl: z.string().url().optional(),   // 有值 = 外链卡（整卡新标签打开，不生成详情页）
    externalSource: z.string().optional(),      // 外链来源，如 "微信公众号" / "Bilibili"
    duration: z.string().optional(),            // 视频时长角标，如 "14:32"
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    pinned: z.boolean().default(false),
  }),
});

// 第三栏 Works：学术成果 / 工具软件 / 其他
const works = defineCollection({
  loader: glob({ base: './src/content/works', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['academic', 'tools', 'misc']),
    date: z.coerce.date(),
    summary: z.string(),
    cover: z.string().optional(),
    externalUrl: z.string().url().optional(),
    externalSource: z.string().optional(),      // 如 "GitHub" / "Bilibili"
    duration: z.string().optional(),            // 视频时长角标，如 "57:37"
    linkLabel: z.string().optional(),           // 卡片右侧链接文案，如 "项目主页"；外链自动加 ↗，站内加 →
    draft: z.boolean().default(false),
    order: z.number().optional(),               // 主页自定义排序：小者靠前，未设置按日期倒序
  }),
});

export const collections = { articles, works };
