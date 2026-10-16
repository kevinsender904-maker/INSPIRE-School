import { mockNews } from '@/data/mock/news';
import { News } from '@/types';

export async function getNewsList(): Promise<News[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockNews];
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const item = mockNews.find((n) => n.slug === slug);
  return item ? { ...item } : null;
}
