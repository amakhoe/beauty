import { Service, Doctor, Testimonial, FAQItem } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'online-consultation',
    title: 'Online Doctor Consultation',
    description: 'Discuss your health problems directly with expert doctors, anytime and anywhere.',
    iconName: 'Activity',
    category: 'Consultation'
  },
  {
    id: 'medical-examination',
    title: 'Medical examination',
    description: 'Get complete screening recommendations to detect potential health problems early.',
    iconName: 'Stethoscope',
    category: 'Diagnostic'
  },
  {
    id: 'lifestyle-assistance',
    title: 'Healthy Lifestyle Assistance',
    description: 'A personalized program for diet, exercise and stress management tailored to your needs.',
    iconName: 'Sparkles',
    category: 'Lifestyle'
  },
  {
    id: 'referrals-followup',
    title: 'Referrals and Follow-up',
    description: 'Trusted referral service to hospitals or specialists if needed, with integrated follow-up.',
    iconName: 'Shuffle',
    category: 'Follow-up'
  },
  {
    id: 'mental-health',
    title: 'Mental Health Consultation',
    description: 'Discuss your mental health with an experienced psychologist for the right solution.',
    iconName: 'Brain',
    category: 'Consultation'
  },
  {
    id: 'fitness-nutrition',
    title: 'Fitness and Nutrition Consultation',
    description: 'Find the best way to achieve a healthy, fit body and meet and fulfill your nutritional needs.',
    iconName: 'Flame',
    category: 'Lifestyle'
  }
];

export const DOCTORS_DATA: Doctor[] = [
  {
    id: 'dr-nolan',
    name: 'dr. Nolan Subekti',
    specialty: 'Internal Medicine Specialist',
    rating: 4.9,
    reviewsCount: 1240,
    patientsCount: 1800,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    availableSlots: ['09:00 AM', '11:00 AM', '02:30 PM', '04:00 PM'],
    bio: 'dr. Nolan Subekti is a senior Internal Medicine specialist with over 12 years of experience. He is dedicated to preventive medicine, chronic disease management, and thorough patient diagnostics.'
  },
  {
    id: 'dr-pramono',
    name: 'dr. Pramono Sudhiro',
    specialty: 'Dentist Specialist',
    rating: 5.0,
    reviewsCount: 1129,
    patientsCount: 1129,
    image: 'https://images.unsplash.com/photo-1622908061243-2991f53ae5a9?q=80&w=600&auto=format&fit=crop',
    accentBg: true,
    availableSlots: ['08:30 AM', '10:00 AM', '01:00 PM', '03:30 PM'],
    bio: 'dr. Pramono Sudhiro specializes in cosmetic dentistry, dental implants, and anxiety-free oral healthcare. He utilizes the latest digital dental technologies to ensure precise and pain-free treatments.'
  },
  {
    id: 'dr-aishaa',
    name: 'dr. Aishaa',
    specialty: 'Mental Health Specialist',
    rating: 4.8,
    reviewsCount: 812,
    patientsCount: 1450,
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop',
    availableSlots: ['10:30 AM', '12:00 PM', '03:00 PM', '05:00 PM'],
    bio: 'dr. Aishaa offers comprehensive psychological evaluations and psychiatric consulting. She holds a double degree in Clinical Psychology and Cognitive Behavioral Therapy with a compassionate, gentle care approach.'
  },
  {
    id: 'dr-basuka',
    name: 'dr. Basuka',
    specialty: 'Mental Health Specialist',
    rating: 4.9,
    reviewsCount: 954,
    patientsCount: 1200,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
    availableSlots: ['09:30 AM', '11:30 AM', '02:00 PM', '04:30 PM'],
    bio: 'dr. Basuka focuses on stress management, cognitive wellness, and adolescent mental wellness programs. He believes in empowering patients through supportive conversations and actionable wellness guidelines.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'yuna',
    name: 'Yuna Yuliana',
    role: 'Teacher',
    content: '"I had a health concern at 11 PM and wasn\'t sure where to turn. Ngobati had a doctor available for a consultation in no time. The care I received was thorough and reassuring."',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'
  },
  {
    id: 'luciano',
    name: 'Luciano Spaletti',
    role: 'Manager',
    content: '"Balancing work and family is tough, and finding time to visit a clinic was always a hassle. With Ngobati, I can consult a doctor during lunch breaks or after the kids go to bed."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    accent: true
  },
  {
    id: 'madame',
    name: 'Madame Khoam Phang',
    role: 'Business Owner',
    content: '"During the pandemic, I wanted to avoid crowded clinics. Ngobati gave me peace of mind with high-quality consultations from the safety of my home."',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop'
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What services do you offer?',
    answer: 'We offer a complete suite of digital health options including online doctor consultations across internal medicine, dental, and mental health specialties, personalized health lifestyle programs, diagnostic screening coordination, and integrated follow-ups.'
  },
  {
    id: 'faq-2',
    question: 'Are your consultations online or in-person?',
    answer: 'We offer flexible options for both online and in-person consultations. You can select the option that suits you best during booking. Online visits are conducted via secure, high-definition video built directly into our platform.'
  },
  {
    id: 'faq-3',
    question: 'Can I choose my preferred consultant?',
    answer: 'Absolutely! Our scheduler lets you explore our certified staff, read patient reviews, and pick the perfect specialist suited to your health goals.'
  },
  {
    id: 'faq-4',
    question: 'Is my personal information secure?',
    answer: 'Yes, player privacy and security are our highest priorities. All medical files, chat logs, and billing details are encrypted end-to-end and stored in compliance with top-tier international medical data regulations.'
  },
  {
    id: 'faq-5',
    question: 'How do I book a consultation?',
    answer: 'Simply click "Make a Schedule" anywhere on our site to launch our interactive booking engine. Pick your preferred service type, date/time slot, and complete the form in under two minutes.'
  },
  {
    id: 'faq-6',
    question: 'How to start a consultation?',
    answer: 'Once booked, you will receive a confirmation link. At the scheduled time, log in to your Ngobati dashboard and click "Join Call" to enter your secure virtual examination room.'
  },
  {
    id: 'faq-7',
    question: 'Can I consult more than one doctor?',
    answer: 'Yes, you can hold multiple active schedules or ask our intake coordinators for multidisciplinary consultations if your medical history calls for it.'
  }
];
