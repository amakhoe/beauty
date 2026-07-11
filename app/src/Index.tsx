"use client"


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Stethoscope,
  Sparkles,
  Shuffle,
  Brain,
  Flame,
  Star,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Calendar,
  Clock,
  Heart,
  FileCheck,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkle,
  Lock
} from 'lucide-react';
import { DOCTORS_DATA, SERVICES_DATA, TESTIMONIALS_DATA, FAQS_DATA } from '../data';
import { Doctor, Appointment, Service } from '../types';
import BookingModal from '../components/BookingModal';
import DoctorDetailModal from '../components/DoctorDetailModal';
import MyBookingsDrawer from '../components/MyBookingsDrawer';
import Image from 'next/image';
import Bg1 from '@/Images/IMG_20250519_161508.jpg';

export default function Header() {
  // Navigation & Menu States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingsDrawerOpen, setBookingsDrawerOpen] = useState(false);
  
  // Interactive Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | undefined>(undefined);
  const [activeDetailedDoctor, setActiveDetailedDoctor] = useState<Doctor | null>(null);

  // FAQ Accordion State (stores expanded FAQ IDs)
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-2'); // Start with second expanded like screenshot

  // Appointment Persistence
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ngobati_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse appointments', e);
      }
    }
  }, []);

  const handleBookingSuccess = (newApt: Appointment) => {
    setAppointments(prev => [...prev, newApt]);
    // Optionally trigger a little toast or float banner
  };

  const handleCancelAppointment = (id: string) => {
    const filtered = appointments.filter(apt => apt.id !== id);
    setAppointments(filtered);
    localStorage.setItem('ngobati_appointments', JSON.stringify(filtered));
  };

  const openBookingForService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Find matching doctor if any
    if (serviceId === 'mental-health') {
      setSelectedDoctorId('dr-aishaa');
    } else if (serviceId === 'medical-examination') {
      setSelectedDoctorId('dr-nolan');
    } else {
      setSelectedDoctorId(undefined);
    }
    setBookingModalOpen(true);
  };

  const openBookingForDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    const doc = DOCTORS_DATA.find(d => d.id === doctorId);
    if (doc) {
      if (doc.specialty.includes('Dentist')) {
        setSelectedServiceId('medical-examination');
      } else if (doc.specialty.includes('Internal')) {
        setSelectedServiceId('online-consultation');
      } else {
        setSelectedServiceId('mental-health');
      }
    }
    setActiveDetailedDoctor(null);
    setBookingModalOpen(true);
  };

  // Helper mapping string icon name to Lucide components
  const renderServiceIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className={className} />;
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Shuffle':
        return <Shuffle className={className} />;
      case 'Brain':
        return <Brain className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      default:
        return <Activity className={className} />;
    }
  };

  // Testimonials slide helper
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(1); // Set middle card as active initially
  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };
  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. BRAND HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-100/80 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED] text-white shadow-md shadow-violet-500/20 group-hover:scale-105 transition-transform">
                {/* SVG heart + stethoscope logo */}
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 stroke-current stroke-2">
                  <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6a6 6 0 0 1 12 0v1a6 6 0 0 1 12 0c0 2.5-1 4.5-2.5 6l-9.5 7.5-9.5-7.5Z" />
                  <path d="M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#1A191E] font-sans">
                Ngobati
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'About Us', 'Services', 'Blog'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-sm font-semibold text-gray-900 hover:text-[#7C3AED] transition-colors relative py-1.5 group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7C3AED] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Buttons / Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {appointments.length > 0 && (
                <button
                  onClick={() => setBookingsDrawerOpen(true)}
                  className="flex items-center space-x-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-colors"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>{appointments.length} Booking{appointments.length > 1 ? 's' : ''}</span>
                </button>
              )}

              <button
                onClick={() => {
                  setSelectedServiceId(undefined);
                  setSelectedDoctorId(undefined);
                  setBookingModalOpen(true);
                }}
                className="flex items-center space-x-2 rounded-full cursor-pointer bg-gradient-to-t from-gray-700 to-[#1A191E] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/10 hover:bg-gray-800 hover:shadow-xl transition-all group"
              >
                <span>Contact Us</span>
                <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden items-center space-x-2">
              {appointments.length > 0 && (
                <button
                  onClick={() => setBookingsDrawerOpen(true)}
                  className="rounded-full bg-emerald-100 p-2 text-emerald-700"
                >
                  <Calendar className="h-4.5 w-4.5" />
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full bg-gray-100 p-2 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="space-y-1.5 px-4 py-4">
                {['Home', 'About Us', 'Services', 'Blog'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-[#F4F0FF] hover:text-[#7C3AED] transition-all"
                  >
                    {item}
                  </a>
                ))}
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setBookingModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#b394ea] to-[#7C3AED] py-3 text-sm font-bold text-white"
                  >
                    <span>Contacte-nos</span>
                    <ArrowUpRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-[#F4F3F8] to-[#FAF9FC] overflow-hidden">
        
        {/* Abstract Background Blur Orbs */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
         

          {/* Core Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#1A191E] max-w-4xl mx-auto leading-[1.1]"
          >
            Discover Patient-Centered Health Consultation Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-indigo-600">Anytime, Anywhere</span>
          </motion.h1>

          {/* Subtitle description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-sm sm:text-base text-gray-800 max-w-2xl mx-auto leading-relaxed"
          >
            We are here to provide easily accessible, reliable, and innovative health solutions supported by technology and a team of experienced medical experts.
          </motion.p>

          {/* CTA Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <button
              onClick={() => setBookingModalOpen(true)}
              className="flex items-center space-x-2.5 rounded-full bg-gradient-to-r from-[#b394ea] to-[#7C3AED]  px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-500/20 hover:bg-[#6D28D9] hover:shadow-xl hover:shadow-violet-500/30 transition-all group"
            >
              <span>Contact Us</span>
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white">
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>

          {/* ASYMMETRIC HERO IMAGES FLOATING MOSAIC */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 grid grid-cols-12 gap-4 items-center max-w-5xl mx-auto"
          >
            {/* Left Image (Rotated aspect, woman receiving checkup) */}
            <div className="col-span-3 aspect-[4/5] rounded-3xl overflow-hidden shadow-md hidden sm:block transform hover:rotate-0 transition-transform duration-500">
              <Image
                src={Bg1}
                alt="Patient consultation"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Middle Main Image (Clinical cast/Doctor holding hand, with badges) */}
            <div className="col-span-12 sm:col-span-6 relative rounded-[32px] overflow-hidden shadow-xl  aspect-[4/3]">
              <Image
                src={Bg1}
                alt="Medical staff treatment"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />

              {/* Float Badge: Best Service (Left corner) */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-sm border border-gray-100 text-[10px] font-extrabold text-[#1A191E] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Best Service</span>
              </div>

              {/* Float Badge: Expert Teams (Right corner) */}
              <div className="absolute top-4 right-4 flex items-center space-x-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-sm border border-gray-100 text-[10px] font-extrabold text-[#7C3AED] backdrop-blur-md">
                <Sparkles className="h-3 w-3 fill-current" />
                <span>Expert Teams</span>
              </div>
            </div>

            {/* Right Image (Doctor writing diagnosis, rotated right) */}
            <div className="col-span-3 aspect-[4/5] rounded-3xl overflow-hidden shadow-md hidden sm:block transform hover:rotate-0 transition-transform duration-500">
              <Image
                src={Bg1}
                alt="Clinical professional"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. PARTNER & PHONE MOCKUP SECTION */}
      <section id="about-us" className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#FAF9FC] border border-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                <Heart className="h-3.5 w-3.5 text-[#7C3AED]" />
                <span>Our Mission</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A191E] leading-tight">
                Your Health Partner, Always By Your Side
              </h2>

              <p className="text-sm text-gray-500 leading-relaxed">
                Our Mission We believe that health is everyone's right. Our mission is to help people live healthier lives through quality services, health education, and cutting-edge medical technology.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="flex items-center space-x-2.5 rounded-full bg-[#7C3AED] px-6 py-3 text-xs font-bold text-white hover:bg-[#6D28D9] transition-all group"
                >
                  <span>Make a Schedule</span>
                  <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white/20 text-white">
                    <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Interactive Phone Mockup column (As shown in screenshot) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Convenient Access with Phone Mockup */}
              <div className="rounded-[32px] bg-[#E8E2FA] p-6 flex flex-col items-center justify-between border border-violet-100 shadow-sm overflow-hidden min-h-[460px] relative">
                
                <div className="w-full text-center mb-6">
                  <h4 className="text-sm font-extrabold text-violet-900 mb-1">Convenient Access</h4>
                  <p className="text-[11px] text-violet-700/80 max-w-xs mx-auto">
                    Schedule consultations online and get advice without leaving your home.
                  </p>
                </div>

                {/* Inner Phone Screen Container */}
                <div className="w-[210px] h-[330px] rounded-[28px] bg-[#FAF9FC] border-[6px] border-[#1A191E] shadow-xl overflow-hidden flex flex-col p-3.5 space-y-3 relative">
                  
                  {/* Phone Speaker Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-[#1A191E] rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 absolute right-3" />
                  </div>

                  {/* Phone Header Time & Signals */}
                  <div className="flex justify-between items-center text-[8px] font-extrabold text-gray-400 pt-1 px-1">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <span>📶</span>
                      <span>🔋</span>
                    </div>
                  </div>

                  {/* App Bar inside phone */}
                  <div className="flex justify-between items-center text-[9px] font-bold text-[#1A191E] border-b border-gray-100 pb-1.5">
                    <span className="text-gray-400">&lt;</span>
                    <span>Doctor Appointment</span>
                    <span className="text-rose-500 font-semibold">♥</span>
                  </div>

                  {/* Doctor Profile card inside phone */}
                  <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100/60 flex flex-col items-center text-center">
                    <img
                      src="https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=150&auto=format&fit=crop"
                      alt="Doctor inside phone"
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover border border-[#7C3AED]/20 mb-1"
                    />
                    <h5 className="text-[9px] font-black text-[#1A191E] leading-tight">dr. Rahwani Muerta</h5>
                    <p className="text-[7px] text-gray-400">Dentist Specialist</p>
                    
                    <div className="flex items-center space-x-1.5 mt-1">
                      <div className="flex items-center text-[7px] text-amber-500 font-bold">
                        <Star className="h-2 w-2 fill-current" />
                        <span className="ml-0.5">4.9</span>
                      </div>
                      <span className="text-[6px] text-gray-300">|</span>
                      <span className="text-[7px] text-gray-400 font-semibold">512 Reviews</span>
                    </div>
                  </div>

                  {/* Mini Grid Stats inside phone */}
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="bg-[#F4F0FF] rounded-lg p-1">
                      <span className="block text-[8px] font-extrabold text-[#7C3AED]">812</span>
                      <span className="text-[5px] text-gray-400 font-bold uppercase">Reviews</span>
                    </div>
                    <div className="bg-[#F4F0FF] rounded-lg p-1">
                      <span className="block text-[8px] font-extrabold text-[#7C3AED]">1129</span>
                      <span className="text-[5px] text-gray-400 font-bold uppercase">Patients</span>
                    </div>
                    <div className="bg-[#F4F0FF] rounded-lg p-1">
                      <span className="block text-[8px] font-extrabold text-[#7C3AED]">1129</span>
                      <span className="text-[5px] text-gray-400 font-bold uppercase">Experience</span>
                    </div>
                  </div>

                  {/* Book button inside phone */}
                  <button className="w-full bg-[#1A191E] text-white py-1.5 rounded-lg text-[7px] font-bold text-center mt-1">
                    Book Appointment
                  </button>
                </div>

              </div>

              {/* Card 2: Certified Professionals with Connected Network */}
              <div className="rounded-[32px] bg-gray-50 p-6 flex flex-col justify-between border border-gray-100 shadow-sm min-h-[460px]">
                
                <div className="w-full text-center">
                  <h4 className="text-sm font-extrabold text-[#1A191E] mb-1">Certified Professionals</h4>
                  <p className="text-[11px] text-gray-500 max-w-xs mx-auto">
                    Our team is licensed and highly professional in all fields.
                  </p>
                </div>

                {/* Connected Node Graphic (Pulsing network of medical categories) */}
                <div className="relative h-60 w-full flex items-center justify-center">
                  
                  {/* Central Hub Doctor badge */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="h-16 w-16 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-lg shadow-violet-500/30 z-10 border-4 border-white"
                  >
                    <Stethoscope className="h-7 w-7" />
                  </motion.div>

                  {/* Surrounding Node 1 (Heart) */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-8 left-12 h-10 w-10 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-sm border border-gray-100"
                  >
                    <Heart className="h-5 w-5 fill-current" />
                  </motion.div>

                  {/* Surrounding Node 2 (Brain) */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5 }}
                    className="absolute top-6 right-12 h-11 w-11 rounded-full bg-white text-indigo-500 flex items-center justify-center shadow-sm border border-gray-100"
                  >
                    <Brain className="h-5.5 w-5.5" />
                  </motion.div>

                  {/* Surrounding Node 3 (Fitness) */}
                  <motion.div
                    animate={{ x: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                    className="absolute bottom-10 left-16 h-10 w-10 rounded-full bg-white text-emerald-500 flex items-center justify-center shadow-sm border border-gray-100"
                  >
                    <Flame className="h-5 w-5" />
                  </motion.div>

                  {/* Surrounding Node 4 (Diagnosis) */}
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4.8 }}
                    className="absolute bottom-12 right-14 h-10 w-10 rounded-full bg-white text-amber-500 flex items-center justify-center shadow-sm border border-gray-100"
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>

                  {/* Network Dotted SVG lines connecting nodes to central hub */}
                  <svg className="absolute inset-0 h-full w-full -z-0 stroke-gray-200 stroke-[1.5] stroke-dasharray-[4]">
                    <line x1="50%" y1="50%" x2="25%" y2="25%" />
                    <line x1="50%" y1="50%" x2="75%" y2="22%" />
                    <line x1="50%" y1="50%" x2="30%" y2="78%" />
                    <line x1="50%" y1="50%" x2="72%" y2="76%" />
                  </svg>

                </div>

                {/* Small security certificate note */}
                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gray-400 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Verified Credentials File: NG_026_MED</span>
                </div>

              </div>

            </div>

          </div>

          {/* STATS COUNT ROW (Sleek card bottom layout) */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
            
            {/* Stat 1 */}
            <div className="bg-[#FAF9FC] rounded-2xl p-5 border border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-3xl font-black text-[#1A191E]">17,8M</h4>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">User Satisfied</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center text-[#7C3AED]">
                <Heart className="h-5 w-5 fill-current" />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#FAF9FC] rounded-2xl p-5 border border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-3xl font-black text-[#1A191E]">100%</h4>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Satisfying Treatment</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Sparkle className="h-5 w-5 fill-current" />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#FAF9FC] rounded-2xl p-5 border border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="text-3xl font-black text-[#1A191E]">1,2K</h4>
                <p className="text-xs text-gray-400 font-semibold mt-0.5">Doctor Certified</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#E8E2FA] flex items-center justify-center text-[#7C3AED]">
                <FileCheck className="h-5 w-5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. HEALTHCARE SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#FAF9FC] relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#F4F0FF] px-3.5 py-1 text-xs font-bold text-[#7C3AED]">
              <Activity className="h-3.5 w-3.5" />
              <span>Services</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A191E]">
              Healthcare Services Designed to Suit Your Needs
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              We are here to ensure your health is maintained with professional, easy and accessible services anytime, anywhere without having to go to the location.
            </p>

          </div>

          {/* Grid of 6 services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {SERVICES_DATA.map((srv) => (
              <motion.div
                key={srv.id}
                whileHover={{ y: -6 }}
                className="group rounded-3xl bg-white border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl transition-all relative overflow-hidden"
              >
                {/* Background soft hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] bg-gradient-to-br from-[#7C3AED] to-indigo-500 transition-all pointer-events-none" />

                <div className="space-y-4">
                  
                  {/* Icon & Category */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7C3AED] bg-violet-50 px-2.5 py-1 rounded-full">
                      {srv.category}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-[#FAF9FC] border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#7C3AED] group-hover:text-white group-hover:rotate-12 transition-all">
                      {renderServiceIcon(srv.iconName, "h-5 w-5")}
                    </div>
                  </div>

                  {/* Info details */}
                  <div>
                    <h3 className="text-base font-extrabold text-[#1A191E] mb-2 group-hover:text-[#7C3AED] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                </div>

                {/* Booking Trigger link at bottom */}
                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <button
                    onClick={() => openBookingForService(srv.id)}
                    className="text-xs font-bold text-gray-500 group-hover:text-[#7C3AED] transition-colors flex items-center"
                  >
                    <span>Book Service</span>
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </button>
                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* 5. MEET EXPERT MEDICAL TEAM */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#FAF9FC] border border-gray-100 px-3.5 py-1 text-xs font-bold text-gray-500">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span>Our Team</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A191E]">
              Meet Our Expert Medical Team of Dedicated Specialists
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Our team is a group of people who are experienced in all fields. Click on any specialist to explore details, check hours, and secure slots directly.
            </p>

          </div>

          {/* Cards Grid of doctors (Mirroring layout exactly!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {DOCTORS_DATA.map((doc) => {
              // Pramono is highlighted in violet background! Let's replicate this exactly.
              if (doc.accentBg) {
                return (
                  <motion.div
                    key={doc.id}
                    whileHover={{ y: -8 }}
                    onClick={() => setActiveDetailedDoctor(doc)}
                    className="cursor-pointer rounded-[32px] bg-[#7C3AED] p-5 text-white shadow-lg shadow-violet-500/15 flex flex-col justify-between aspect-[3/4] relative overflow-hidden group"
                  >
                    {/* Glowing background circles */}
                    <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-xl" />
                    
                    {/* Top image panel */}
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white/20 mb-4 border border-white/20">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Meta details */}
                    <div>
                      <h4 className="text-base font-extrabold tracking-tight leading-snug">{doc.name}</h4>
                      <p className="text-xs text-violet-200 mt-0.5 font-medium">{doc.specialty}</p>
                    </div>

                    {/* Bottom Indicator Badge */}
                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                      <div className="flex items-center text-xs font-bold text-amber-300">
                        <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                        <span>{doc.rating}</span>
                      </div>
                      
                      {/* Diagonal arrow indicator in bottom corner */}
                      <div className="h-7 w-7 rounded-full bg-white text-[#7C3AED] flex items-center justify-center">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>

                  </motion.div>
                );
              }

              // Standard doctor card with light borders
              return (
                <motion.div
                  key={doc.id}
                  whileHover={{ y: -8 }}
                  onClick={() => setActiveDetailedDoctor(doc)}
                  className="cursor-pointer rounded-[32px] bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md flex flex-col justify-between aspect-[3/4] group"
                >
                  
                  {/* Image container */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 border border-gray-100">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                  </div>

                  {/* Basic meta */}
                  <div>
                    <h4 className="text-base font-extrabold text-[#1A191E] tracking-tight leading-snug">{doc.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 font-semibold">{doc.specialty}</p>
                  </div>

                  {/* Bottom details */}
                  <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center text-xs font-semibold text-amber-500">
                      <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                      <span>{doc.rating}</span>
                    </div>

                    {/* Diagonal arrow indicator in bottom corner */}
                    <div className="h-7 w-7 rounded-full bg-[#FAF9FC] border border-gray-100 text-[#1A191E] flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS: REAL STORIES REAL IMPACT */}
      <section className="py-24 bg-purple-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#F4F0FF] px-3.5 py-1 text-xs font-bold text-[#7C3AED]">
              <Heart className="h-3.5 w-3.5" />
              <span>Testimonial</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A191E]">
              Real Stories Real Impact
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Their satisfaction is all thanks to our hard work. Check out their testimonials.
            </p>

          </div>

          {/* Testimonial Cards Layout (Luciano Spaletti highlighted in middle!) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
            
            {TESTIMONIALS_DATA.map((t, index) => {
              const isCenter = index === activeTestimonialIdx;

              if (t.accent) {
                return (
                  <motion.div
                    key={t.id}
                    animate={{ scale: isCenter ? 1.02 : 0.98 }}
                    className={`rounded-[32px] bg-[#7C3AED] p-8 text-white shadow-lg shadow-violet-500/10 flex flex-col justify-between border-4 ${
                      isCenter ? 'border-violet-300/40' : 'border-transparent'
                    } transition-all`}
                  >
                    {/* Stars */}
                    <div className="flex space-x-1 text-amber-300 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-4 w-4 fill-current" />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p className="text-sm font-medium leading-relaxed mb-8 italic">
                      {t.content}
                    </p>

                    {/* Author Meta */}
                    <div className="flex items-center space-x-3.5 border-t border-white/10 pt-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        referrerPolicy="no-referrer"
                        className="h-10 w-10 rounded-full object-cover border-2 border-white/20"
                      />
                      <div>
                        <h4 className="text-xs font-black tracking-tight">{t.name}</h4>
                        <p className="text-[10px] text-violet-200 font-bold">{t.role}</p>
                      </div>
                    </div>

                  </motion.div>
                );
              }

              // Normal Card
              return (
                <motion.div
                  key={t.id}
                  animate={{ scale: isCenter ? 1.02 : 0.98 }}
                  className={`rounded-[32px] bg-white border border-gray-100 p-8 shadow-sm flex flex-col justify-between ${
                    isCenter ? 'ring-2 ring-[#7C3AED]/20 border-[#7C3AED]' : ''
                  } transition-all`}
                >
                  
                  {/* Stars */}
                  <div className="flex space-x-1 text-amber-400 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 italic">
                    {t.content}
                  </p>

                  {/* Author Meta */}
                  <div className="flex items-center space-x-3.5 border-t border-gray-50 pt-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-xs font-black text-[#1A191E] tracking-tight">{t.name}</h4>
                      <p className="text-[10px] text-gray-400 font-semibold">{t.role}</p>
                    </div>
                  </div>

                </motion.div>
              );
            })}

          </div>

          {/* Slide Navigator indicators & controls (Bottom of testimonial grid) */}
          <div className="mt-12 flex justify-center items-center space-x-6">
            
            {/* Prev arrow button */}
            <button
              onClick={handlePrevTestimonial}
              className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] transition-colors shadow-sm"
            >
              &larr;
            </button>

            {/* Pagination dot lines */}
            <div className="flex space-x-1.5">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonialIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonialIdx === idx ? 'w-6 bg-[#7C3AED]' : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Next arrow button */}
            <button
              onClick={handleNextTestimonial}
              className="h-10 w-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] transition-colors shadow-sm"
            >
              &rarr;
            </button>

          </div>

        </div>
      </section>

      {/* 7. GOT QUESTIONS? WE'VE GOT ANSWERS! (FAQ Section) */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-[#FAF9FC] border border-gray-100 px-3.5 py-1 text-xs font-bold text-gray-500">
              <Sparkles className="h-3.5 w-3.5 text-[#7C3AED]" />
              <span>Frequently Asked Question</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A191E]">
              Got Questions? We've Got Answers!
            </h2>

            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
              We understand you might have a few questions before starting your journey to better health. Here are some of the most common queries we receive:
            </p>

          </div>

          {/* Interactive Accordion Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto items-start">
            
            {/* Left FAQ Stack */}
            <div className="space-y-3">
              {FAQS_DATA.slice(0, 4).map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isExpanded
                        ? 'border-[#7C3AED] bg-[#F4F0FF]/30 shadow-sm'
                        : 'border-gray-100 bg-[#FAF9FC] hover:border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left p-5 focus:outline-none"
                    >
                      <span className="text-sm font-bold text-[#1A191E] pr-4">{faq.question}</span>
                      <div className={`shrink-0 rounded-full p-1.5 border transition-all ${
                        isExpanded ? 'border-[#7C3AED] bg-[#7C3AED] text-white rotate-180' : 'border-gray-200 bg-white text-gray-400'
                      }`}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-gray-100/60 text-xs text-gray-500 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            {/* Right FAQ Stack */}
            <div className="space-y-3">
              {FAQS_DATA.slice(4).map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 ${
                      isExpanded
                        ? 'border-[#7C3AED] bg-[#F4F0FF]/30 shadow-sm'
                        : 'border-gray-100 bg-[#FAF9FC] hover:border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left p-5 focus:outline-none"
                    >
                      <span className="text-sm font-bold text-[#1A191E] pr-4">{faq.question}</span>
                      <div className={`shrink-0 rounded-full p-1.5 border transition-all ${
                        isExpanded ? 'border-[#7C3AED] bg-[#7C3AED] text-white rotate-180' : 'border-gray-200 bg-white text-gray-400'
                      }`}>
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-gray-100/60 text-xs text-gray-500 leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER (Bottom highlight) */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Wave banner styled beautifully */}
          <div className="relative rounded-[40px] bg-gradient-to-tr from-purple-500 to-purple-950 px-8 py-16 text-center text-white shadow-xl shadow-violet-500/10 overflow-hidden">
            
            {/* Background 3D stylized element lines */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_50%)]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-pulse" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Let's Realize Your Health Anytime, Anywhere!
              </h2>

              <p className="text-xs sm:text-sm text-violet-100 max-w-md mx-auto leading-relaxed">
                Connect with our certified experts under 2 minutes. Secure consultations inside our secure HIPAA compliant medical workspace portal.
              </p>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="flex items-center space-x-2 rounded-full bg-white px-8 py-4 text-xs font-black text-[#7C3AED] shadow-md hover:bg-violet-50 hover:shadow-lg transition-all group"
                >
                  <span>Make a Schedule</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FAF9FC] text-[#7C3AED]">
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 9. FOOTER SECTION */}
      <footer className="bg-[#FAF9FC] border-t border-gray-100 mt-auto py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/60">
            
            {/* Brand Logo */}
            <a href="#" className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED] text-white">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current stroke-2">
                  <path d="M4.5 16.5c-1.5-1.5-2.5-3.5-2.5-6a6 6 0 0 1 12 0v1a6 6 0 0 1 12 0c0 2.5-1 4.5-2.5 6l-9.5 7.5-9.5-7.5Z" />
                  <path d="M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[#1A191E]">
                Ngobati
              </span>
            </a>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-500">
              <a href="#" className="hover:text-[#7C3AED] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#7C3AED] transition-colors">Terms of Services</a>
              <a href="#" className="hover:text-[#7C3AED] transition-colors">Cookie Policy</a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-400 font-bold">
            <span>© 2026 Ngobati. All rights reserved.</span>
          </div>

        </div>
      </footer>

      {/* ========================================================== */}
      {/* 10. MODALS / DRAWERS LAYERS */}
      
      {/* Dynamic Appointment Scheduler Wizard Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={selectedServiceId}
        preselectedDoctorId={selectedDoctorId}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Doctor detail bio & slots modal */}
      <DoctorDetailModal
        doctor={activeDetailedDoctor}
        onClose={() => setActiveDetailedDoctor(null)}
        onBook={openBookingForDoctor}
      />

      {/* Saved active bookings drawer panel */}
      <MyBookingsDrawer
        isOpen={bookingsDrawerOpen}
        onClose={() => setBookingsDrawerOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
      />

    </div>
  );
}
