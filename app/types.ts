export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  patientsCount: number;
  image: string;
  accentBg?: boolean;
  availableSlots: string[];
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  accent?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Appointment {
  id: string;
  serviceType: string;
  specialty: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  notes?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}
