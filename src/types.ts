export interface Appointment {
  id?: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Service {
  id?: string;
  name: string;
  description: string;
  icon: string;
  price?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface ClinicSettings {
  clinicName: string;
  phone: string;
  address: string;
  mapsLink: string;
  whatsapp: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'admin' | 'user';
  displayName?: string;
}

export interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
  createdAt: string;
}

export const CLINIC_SERVICES = [
  "X Ray",
  "Physiotherapy",
  "TMT Test",
  "ECG Test",
  "2D Echo Test",
  "Ultrasound",
  "PFT Test"
];
