import { mockAlbums, mockPhotos } from '@/data/mock/gallery';
import { GalleryAlbum, GalleryPhoto } from '@/types';

export async function getAlbumsList(): Promise<GalleryAlbum[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockAlbums];
}

export async function getAlbumById(id: string): Promise<GalleryAlbum | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const album = mockAlbums.find((a) => a.id === id);
  return album ? { ...album } : null;
}

export async function getPhotosByAlbum(albumId: string): Promise<GalleryPhoto[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockPhotos.filter((p) => p.album_id === albumId);
}
