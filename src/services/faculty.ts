import { mockFaculty } from '@/data/mock/faculty';
import { Faculty } from '@/types';

export async function getFacultyList(): Promise<Faculty[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockFaculty];
}
