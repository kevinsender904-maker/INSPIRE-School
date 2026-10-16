import { mockFeeStructure } from '@/data/mock/feeStructure';
import { FeeStructure } from '@/types';

export async function getFeeStructure(): Promise<FeeStructure[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...mockFeeStructure].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}
