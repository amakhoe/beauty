import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle, Calendar, Award, Heart, MessageSquare } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctorId: string) => void;
}

export default function DoctorDetailModal({ doctor, onClose, onBook }: DoctorDetailModalProps) {
  if (!doctor) return null;

  return (
    <AnimatePresence>
      {doctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-500 backdrop-blur-md hover:bg-gray-100 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Doctor Cover Card */}
            <div className="relative h-48 bg-gradient-to-tr from-[#7C3AED] to-indigo-500 overflow-hidden">
              {/* Abstract overlay */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,var(--color-white),transparent_60%)]" />
              <div className="absolute bottom-4 left-6 flex items-center">
                <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                  {doctor.specialty}
                </div>
              </div>
            </div>

            {/* Doctor Info Body */}
            <div className="px-6 pb-6 pt-16 relative">
              {/* Float Avatar */}
              <div className="absolute top-0 left-6 -translate-y-1/2">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  referrerPolicy="no-referrer"
                  className="h-24 w-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Basic Meta */}
              <div className="mb-4">
                <h3 className="text-xl font-extrabold text-[#1A191E]">{doctor.name}</h3>
                <p className="text-sm font-semibold text-[#7C3AED]">{doctor.specialty}</p>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">About Doctor</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>

              {/* Metrics Bento-like boxes */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="rounded-2xl bg-gray-50 p-3 text-center border border-gray-100">
                  <span className="block text-lg font-extrabold text-[#1A191E]">{doctor.rating}</span>
                  <div className="flex items-center justify-center text-[10px] font-bold text-amber-500">
                    <Star className="mr-0.5 h-3 w-3 fill-current" />
                    <span>Rating</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3 text-center border border-gray-100">
                  <span className="block text-lg font-extrabold text-[#1A191E]">{doctor.reviewsCount}+</span>
                  <div className="flex items-center justify-center text-[10px] font-bold text-[#7C3AED]">
                    <MessageSquare className="mr-0.5 h-3 w-3" />
                    <span>Reviews</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-gray-50 p-3 text-center border border-gray-100">
                  <span className="block text-lg font-extrabold text-[#1A191E]">{doctor.patientsCount}+</span>
                  <div className="flex items-center justify-center text-[10px] font-bold text-emerald-600">
                    <Heart className="mr-0.5 h-3 w-3" />
                    <span>Patients</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Availability Slots */}
              <div className="mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Available Slots Today</span>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableSlots.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-lg bg-[#FAF9FC] border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Book Call-to-Action */}
              <button
                onClick={() => onBook(doctor.id)}
                className="w-full flex items-center justify-center space-x-2 rounded-full bg-[#7C3AED] py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 hover:bg-[#6D28D9] hover:shadow-xl hover:shadow-violet-500/20 transition-all"
              >
                <Calendar className="h-4.5 w-4.5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
