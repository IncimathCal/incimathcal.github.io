// RSS 订阅（/rss.xml）。只 feed Blog 栏：外链条目 link 直达原文，站内文章 link 到详情页。
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { sortArticles } from '../lib/sort';

export async function GET(context) {
  const posts = sortArticles(await getCollection('articles', ({ data }) => !data.draft));
  return rss({
    title: 'IncimathCal · Blog',
    description: '轨道交通规划研究、音游与工具产出',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary,
      pubDate: p.data.date,
      link: p.data.externalUrl ?? `/articles/${p.id}/`,
    })),
  });
}
