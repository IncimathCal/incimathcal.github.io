export const workCategories = {
  academic: { label: 'Research', path: '/works/academic/' },
  tools: { label: 'Tools', path: '/works/tools/' },
  misc: { label: 'Misc', path: '/works/misc/' },
} as const;

export type WorkCategory = keyof typeof workCategories;
