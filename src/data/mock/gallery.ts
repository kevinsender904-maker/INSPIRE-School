import { GalleryAlbum, GalleryPhoto } from '@/types';

export const mockAlbums: GalleryAlbum[] = [
  {
    id: 'album-1',
    title_en: 'Annual Function',
    title_ur: 'سالانہ تقریب',
    cover_url: '',
    sort_order: 1,
    status: 'published',
  },
  {
    id: 'album-2',
    title_en: 'Sports Day',
    title_ur: 'سپورٹس ڈے',
    cover_url: '',
    sort_order: 2,
    status: 'published',
  },
  {
    id: 'album-3',
    title_en: 'Science Fair',
    title_ur: 'سائنس نمائش',
    cover_url: '',
    sort_order: 3,
    status: 'published',
  },
  {
    id: 'album-4',
    title_en: 'Classrooms',
    title_ur: 'کلاس رومز اور لیبز',
    cover_url: '',
    sort_order: 4,
    status: 'published',
  },
  {
    id: 'album-5',
    title_en: 'Campus',
    title_ur: 'سکول کیمپس اور گراؤنڈ',
    cover_url: '',
    sort_order: 5,
    status: 'published',
  },
];

export const mockPhotos: GalleryPhoto[] = [
  { id: 'photo-1', album_id: 'album-1', image_url: '', caption: 'Stage performance by primary grade students', sort_order: 1 },
  { id: 'photo-2', album_id: 'album-1', image_url: '', caption: 'Principal presenting merit shields to top achievers', sort_order: 2 },
  { id: 'photo-3', album_id: 'album-1', image_url: '', caption: 'National anthem choir performance', sort_order: 3 },
  { id: 'photo-4', album_id: 'album-2', image_url: '', caption: '100m sprint finals', sort_order: 1 },
  { id: 'photo-5', album_id: 'album-2', image_url: '', caption: 'Tug of war inter-house competition', sort_order: 2 },
  { id: 'photo-6', album_id: 'album-3', image_url: '', caption: 'Robotics and solar power demonstration', sort_order: 1 },
  { id: 'photo-7', album_id: 'album-3', image_url: '', caption: 'Young chemists conducting chromatography demo', sort_order: 2 },
  { id: 'photo-8', album_id: 'album-4', image_url: '', caption: 'Montessori activity zone and tactile learning tools', sort_order: 1 },
  { id: 'photo-9', album_id: 'album-4', image_url: '', caption: 'Senior computer lab with high-speed internet', sort_order: 2 },
  { id: 'photo-10', album_id: 'album-5', image_url: '', caption: 'School entrance and administration block', sort_order: 1 },
  { id: 'photo-11', album_id: 'album-5', image_url: '', caption: 'Lush green play area and cricket pitch', sort_order: 2 },
];
