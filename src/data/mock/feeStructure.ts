import { FeeStructure } from '@/types';

export const mockFeeStructure: FeeStructure[] = [
  {
    id: 'fee-1',
    class_group: 'Playgroup–Prep',
    admission_fee: 10000,
    monthly_fee: 4500,
    notes: 'Includes activity kit, art supplies, and sensory play materials.',
    sort_order: 1,
  },
  {
    id: 'fee-2',
    class_group: 'Class 1–5',
    admission_fee: 12000,
    monthly_fee: 5500,
    notes: 'Includes library access, IT lab charges, and physical education.',
    sort_order: 2,
  },
  {
    id: 'fee-3',
    class_group: 'Class 6–8',
    admission_fee: 15000,
    monthly_fee: 6500,
    notes: 'Includes science lab consumables, computer labs, and co-curricular clubs.',
    sort_order: 3,
  },
  {
    id: 'fee-4',
    class_group: 'Class 9–10',
    admission_fee: 18000,
    monthly_fee: 8000,
    notes: 'Matric science board preparation, specialized coaching, and practical examinations.',
    sort_order: 4,
  },
];
