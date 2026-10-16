import { Profile } from '@/types';

export const mockUsers: Profile[] = [
  {
    id: 'user-1',
    full_name: 'Dr. Ayesha Khan',
    role: 'super_admin',
    is_active: true,
  },
  {
    id: 'user-2',
    full_name: 'Muhammad Tariq',
    role: 'office_staff',
    is_active: true,
  },
  {
    id: 'user-3',
    full_name: 'Sana Malik',
    role: 'content_editor',
    is_active: true,
  },
  {
    id: 'user-4',
    full_name: 'Usman Raza',
    role: 'teacher',
    is_active: true,
    assigned_classes: ['Class 8', 'Class 9', 'Class 10'],
  },
];

export async function getUsersList(): Promise<Profile[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockUsers];
}
