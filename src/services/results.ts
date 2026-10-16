import { mockResults } from '@/data/mock/results';
import { Result } from '@/types';

export async function lookupResult(
  roll_no: string,
  class_name?: string,
  exam_name?: string
): Promise<Result | null> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  const res = mockResults.find(
    (r) =>
      r.is_published &&
      r.roll_no.trim().toLowerCase() === roll_no.trim().toLowerCase() &&
      (!class_name || r.class.toLowerCase() === class_name.toLowerCase()) &&
      (!exam_name || r.exam_name.toLowerCase().includes(exam_name.toLowerCase()))
  );
  return res ? { ...res } : null;
}

export async function getAllResults(): Promise<Result[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockResults];
}
