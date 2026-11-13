import type { CollectionEntry } from 'astro:content';

/** Blog 排序：置顶优先，其余按日期倒序（getCollection 顺序不确定，必须显式排） */
export function sortArticles(posts: CollectionEntry<'articles'>[]) {
  return [...posts].sort((a, b) => {
    const pin = Number(b.data.pinned) - Number(a.data.pinned);
    if (pin !== 0) return pin;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}

/** Works 排序：order 小者靠前（未设置视为 Infinity），同层按日期倒序 */
export function sortWorks(items: CollectionEntry<'works'>[]) {
  return [...items].sort((a, b) => {
    const ao = a.data.order ?? Infinity;
    const bo = b.data.order ?? Infinity;
    if (ao !== bo) return ao - bo;
    return b.data.date.valueOf() - a.data.date.valueOf();
  });
}
