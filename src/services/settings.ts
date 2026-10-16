import { mockSiteSettings } from '@/data/mock/settings';
import { SiteSettings } from '@/types';

export async function getSiteSettings(): Promise<SiteSettings> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return { ...mockSiteSettings };
}
