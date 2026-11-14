const gradients = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'] as const;

/**
 * 封面样式：有 cover 字段时返回 'has-img'（真图由卡片里的 <img> 渲染），
 * 否则按条目 id 稳定散列到 g1~g8 渐变占位。占位阶段不产图文件；将来放了真封面图，卡片自动切到图片模式。
 */
export function coverClass(id: string, cover?: string): string {
  if (cover) return 'has-img';
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.codePointAt(0)!) % 997;
  return gradients[h % gradients.length];
}
