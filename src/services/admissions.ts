import { mockAdmissions } from '@/data/mock/admissions';
import { AdmissionApplication } from '@/types';

let localAdmissions = [...mockAdmissions];

export async function submitApplication(
  data: Omit<AdmissionApplication, 'id' | 'reference_no' | 'status' | 'created_at'>
): Promise<AdmissionApplication> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  const newApp: AdmissionApplication = {
    ...data,
    id: `adm-${Date.now()}`,
    reference_no: `APP-2027-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'pending',
    created_at: new Date().toISOString(),
  };
  localAdmissions = [newApp, ...localAdmissions];
  return newApp;
}

export async function getApplicationsList(): Promise<AdmissionApplication[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return [...localAdmissions];
}
