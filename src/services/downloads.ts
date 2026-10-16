import { mockDownloads } from '@/data/mock/downloads';
import { Download } from '@/types';

export async function getDownloadsList(): Promise<Download[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockDownloads];
}
