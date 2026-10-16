export type UserRole = 'super_admin' | 'office_staff' | 'content_editor' | 'teacher';
export type PublishStatus = 'draft' | 'published';
export type AdmissionStatus = 'pending' | 'approved' | 'rejected';
export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived';
export type DownloadCategory = 'date_sheet' | 'syllabus' | 'form' | 'other';
export type ActivityAction = 'create' | 'update' | 'delete';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  assigned_classes?: string[];
}

export interface News {
  id: string;
  slug: string;
  title_en: string;
  title_ur: string;
  summary_en: string;
  summary_ur: string;
  body_en: string;
  body_ur: string;
  cover_url: string;
  status: PublishStatus;
  publish_at: string;
  created_by?: string;
}

export interface Event {
  id: string;
  title_en: string;
  title_ur: string;
  description_en: string;
  description_ur: string;
  start_date: string;
  end_date?: string;
  location: string;
  category: string;
  status: PublishStatus;
}

export interface GalleryAlbum {
  id: string;
  title_en: string;
  title_ur: string;
  cover_url: string;
  sort_order: number;
  status: PublishStatus;
}

export interface GalleryPhoto {
  id: string;
  album_id: string;
  image_url: string;
  caption: string;
  sort_order: number;
}

export interface Faculty {
  id: string;
  full_name: string;
  designation: string;
  qualification: string;
  experience_years: number;
  bio?: string;
  photo_url?: string;
  sort_order?: number;
  is_active: boolean;
}

export interface Download {
  id: string;
  title: string;
  category: DownloadCategory;
  file_url: string;
  file_size_kb: number;
  status: PublishStatus;
}

export interface FeeStructure {
  id: string;
  class_group: string;
  admission_fee: number;
  monthly_fee: number;
  notes?: string;
  sort_order?: number;
}

export interface AdmissionApplication {
  id: string;
  reference_no: string;
  status: AdmissionStatus;
  student_name: string;
  dob: string;
  gender: string;
  class_applying: string;
  father_name: string;
  mother_name: string;
  guardian_phone: string;
  guardian_email: string;
  cnic_bform: string;
  address: string;
  previous_school?: string;
  previous_class?: string;
  document_urls?: string[];
  internal_notes?: string;
  reviewed_by?: string;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  created_at?: string;
}

export interface SubjectScore {
  name: string;
  total: number;
  obtained: number;
}

export interface Result {
  id: string;
  roll_no: string;
  student_name: string;
  father_name: string;
  class: string;
  section: string;
  exam_name: string;
  academic_year: string;
  subjects: SubjectScore[];
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  grade: string;
  remarks: string;
  is_published: boolean;
  uploaded_by?: string;
}

export interface SiteSettings {
  id: string;
  school_name: string;
  tagline: string;
  logo_url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_embed_url: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  office_hours: string;
  seo_title: string;
  seo_description: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: ActivityAction;
  table_name: string;
  record_id: string;
  summary: string;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
}
