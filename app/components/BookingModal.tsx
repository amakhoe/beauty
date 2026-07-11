import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, Clock, User, Phone, FileText, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { Doctor, Service, Appointment } from '../types';
import { DOCTORS_DATA, SERVICES_DATA } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedDoctorId?: string;
  onBookingSuccess: (appointment: Appointment) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedDoctorId,
  onBookingSuccess
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>(preselectedServiceId || SERVICES_DATA[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState<string>(preselectedDoctorId || DOCTORS_DATA[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Appointment | null>(null);

  // Generate next 7 days for selection
  const getNext7Days = () => {
    const dates = [];
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        raw: d.toISOString().split('T')[0],
        formatted: d.toLocaleDateString('en-US', options)
      });
    }
    return dates;
  };

  const days = getNext7Days();

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    // Find matching doctor if available
    if (serviceId === 'mental-health') {
      setSelectedDoctor('dr-aishaa');
    } else if (serviceId === 'medical-examination') {
      setSelectedDoctor('dr-nolan');
    } else if (serviceId === 'online-consultation') {
      setSelectedDoctor('dr-nolan');
    } else if (serviceId === 'fitness-nutrition') {
      setSelectedDoctor('dr-basuka');
    }
    setStep(2);
  };

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setStep(3);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(4);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    setIsSubmitting(true);

    const doc = DOCTORS_DATA.find(d => d.id === selectedDoctor) || DOCTORS_DATA[0];
    const srv = SERVICES_DATA.find(s => s.id === selectedService) || SERVICES_DATA[0];

    setTimeout(() => {
      const appointment: Appointment = {
        id: 'apt-' + Math.random().toString(36).substr(2, 9),
        serviceType: srv.title,
        specialty: doc.specialty,
        doctorName: doc.name,
        date: selectedDate,
        timeSlot: selectedTime,
        patientName,
        patientPhone,
        notes,
        status: 'upcoming',
        createdAt: new Date().toISOString()
      };

      // Save to local storage
      const existing = localStorage.getItem('ngobati_appointments');
      const appointments = existing ? JSON.parse(existing) : [];
      appointments.push(appointment);
      localStorage.setItem('ngobati_appointments', JSON.stringify(appointments));

      setNewAppointment(appointment);
      setIsSubmitting(false);
      setBookingConfirmed(true);
      onBookingSuccess(appointment);
    }, 1200);
  };

  const handleClose = () => {
    // Reset state
    setStep(1);
    setSelectedService(SERVICES_DATA[0].id);
    setSelectedDoctor(DOCTORS_DATA[0].id);
    setSelectedDate('');
    setSelectedTime('');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setNotes('');
    setBookingConfirmed(false);
    setNewAppointment(null);
    onClose();
  };

  const activeDoc = DOCTORS_DATA.find(d => d.id === selectedDoctor) || DOCTORS_DATA[0];
  const activeSrv = SERVICES_DATA.find(s => s.id === selectedService) || SERVICES_DATA[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Top Bar Accent */}
            <div className="h-1.5 w-full bg-[#7C3AED]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A191E]">Book Health Consultation</h3>
                <p className="text-xs text-gray-400">Step {bookingConfirmed ? 4 : step} of 4</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6">
              {bookingConfirmed && newAppointment ? (
                /* SUCCESS SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="relative mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.2 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                    >
                      <CheckCircle className="h-10 w-10" />
                    </motion.div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 -z-10 rounded-full bg-emerald-100/40"
                    />
                  </div>

                  <h4 className="text-2xl font-bold text-[#1A191E] mb-2">Appointment Secured!</h4>
                  <p className="text-sm text-gray-500 max-w-md mb-8">
                    Your consult is scheduled with {newAppointment.doctorName}. We have saved this booking to your profile session.
                  </p>

                  <div className="w-full max-w-md rounded-2xl bg-[#FAF9FC] border border-gray-100 p-5 text-left mb-8 space-y-3">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-xs text-gray-400">SERVICE</span>
                      <span className="text-xs font-semibold text-[#1A191E]">{newAppointment.serviceType}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-xs text-gray-400">DOCTOR</span>
                      <span className="text-xs font-semibold text-[#1A191E]">{newAppointment.doctorName} ({newAppointment.specialty})</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-xs text-gray-400">DATE</span>
                      <span className="text-xs font-semibold text-[#1A191E]">
                        {days.find(d => d.raw === newAppointment.date)?.formatted || newAppointment.date}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">TIME</span>
                      <span className="text-xs font-semibold text-[#1A191E]">{newAppointment.timeSlot}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="rounded-full bg-[#1A191E] px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* FORM FLOW */
                <div>
                  {/* Step Indicators */}
                  <div className="mb-6 flex items-center justify-center space-x-2">
                    {[1, 2, 3, 4].map((s) => (
                      <React.Fragment key={s}>
                        <div
                          className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                            step === s
                              ? 'w-8 bg-[#7C3AED]'
                              : step > s
                              ? 'bg-emerald-500'
                              : 'bg-gray-200'
                          }`}
                        />
                        {s < 4 && <div className={`h-0.5 w-6 ${step > s ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
                      </React.Fragment>
                    ))}
                  </div>

                  {step === 1 && (
                    /* STEP 1: SELECT SERVICE */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h4 className="mb-4 text-base font-bold text-[#1A191E]">Select Medical Service</h4>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {SERVICES_DATA.map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => handleServiceSelect(srv.id)}
                            className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                              selectedService === srv.id
                                ? 'border-[#7C3AED] bg-[#F4F0FF]'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <span className="mb-2 text-xs font-bold uppercase tracking-wider text-[#7C3AED]">{srv.category}</span>
                            <span className="text-sm font-bold text-[#1A191E] mb-1">{srv.title}</span>
                            <span className="text-xs text-gray-400 line-clamp-2">{srv.description}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    /* STEP 2: CHOOSE DOCTOR */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h4 className="mb-1 text-base font-bold text-[#1A191E]">Choose Specialized Doctor</h4>
                      <p className="mb-4 text-xs text-gray-400">Recommended for {activeSrv.title}</p>
                      
                      <div className="space-y-3">
                        {DOCTORS_DATA.map((doc) => {
                          const isRecommended = 
                            (activeSrv.id === 'mental-health' && doc.specialty.includes('Mental')) ||
                            (activeSrv.id === 'medical-examination' && doc.specialty.includes('Internal')) ||
                            (activeSrv.id === 'online-consultation' && doc.specialty.includes('Internal')) ||
                            (activeSrv.id === 'fitness-nutrition' && doc.specialty.includes('Mental'));

                          return (
                            <button
                              key={doc.id}
                              type="button"
                              onClick={() => handleDoctorSelect(doc.id)}
                              className={`flex w-full items-center rounded-2xl border p-4 text-left transition-all ${
                                selectedDoctor === doc.id
                                  ? 'border-[#7C3AED] bg-[#F4F0FF]'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <img
                                src={doc.image}
                                alt={doc.name}
                                referrerPolicy="no-referrer"
                                className="mr-4 h-14 w-14 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-[#1A191E]">{doc.name}</span>
                                  {isRecommended && (
                                    <span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-[#7C3AED]">
                                      Recommended
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-gray-400 mb-1">{doc.specialty}</p>
                                <div className="flex items-center text-xs text-amber-500 font-medium">
                                  <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                                  <span>{doc.rating} ({doc.reviewsCount} reviews)</span>
                                </div>
                              </div>
                              <ArrowRight className="h-5 w-5 text-gray-400" />
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-6 flex justify-between">
                        <button
                          onClick={() => setStep(1)}
                          className="text-sm font-semibold text-[#7C3AED] hover:underline"
                        >
                          Back to Services
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    /* STEP 3: SELECT DATE & TIME */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h4 className="mb-1 text-base font-bold text-[#1A191E]">Choose Date & Time Slot</h4>
                      <p className="mb-4 text-xs text-gray-400">Consultation with {activeDoc.name}</p>

                      <div className="mb-6">
                        <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Select Date</span>
                        <div className="flex space-x-2 overflow-x-auto pb-2">
                          {days.map((d) => (
                            <button
                              key={d.raw}
                              type="button"
                              onClick={() => {
                                setSelectedDate(d.raw);
                                setSelectedTime(''); // Reset time selection when date changes
                              }}
                              className={`flex flex-col items-center min-w-[76px] rounded-xl border p-3 text-center transition-all ${
                                selectedDate === d.raw
                                  ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                                  : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                              }`}
                            >
                              <span className="text-[10px] uppercase font-semibold opacity-80">
                                {d.formatted.split(' ')[0]}
                              </span>
                              <span className="text-base font-bold leading-none mt-1">
                                {d.formatted.split(' ')[2] || d.formatted.split(' ')[1]}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {selectedDate && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-6"
                        >
                          <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Available Time Slots</span>
                          <div className="grid grid-cols-3 gap-2">
                            {activeDoc.availableSlots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => handleDateTimeSelect(selectedDate, slot)}
                                className={`rounded-xl border py-2.5 text-center text-xs font-semibold transition-all ${
                                  selectedTime === slot
                                    ? 'border-[#7C3AED] bg-[#F4F0FF] text-[#7C3AED]'
                                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div className="mt-6 flex justify-between">
                        <button
                          onClick={() => setStep(2)}
                          className="text-sm font-semibold text-[#7C3AED] hover:underline"
                        >
                          Back to Doctors
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    /* STEP 4: PATIENT DETAILS */
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h4 className="mb-1 text-base font-bold text-[#1A191E]">Consultation Intake & Contact</h4>
                      <p className="mb-4 text-xs text-gray-400">Verify your information before submission</p>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Patient Full Name *
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <User className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="Jane Doe"
                              value={patientName}
                              onChange={(e) => setPatientName(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Mobile Phone Number *
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                              <Phone className="h-4 w-4" />
                            </span>
                            <input
                              type="tel"
                              required
                              placeholder="+62 812-3456-7890"
                              value={patientPhone}
                              onChange={(e) => setPatientPhone(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                            Medical Notes / Description of Symptoms
                          </label>
                          <div className="relative">
                            <span className="absolute top-3 left-0 flex items-start pl-3 text-gray-400">
                              <FileText className="h-4 w-4" />
                            </span>
                            <textarea
                              placeholder="Describe how you are feeling or specific questions for the doctor..."
                              rows={3}
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
                            />
                          </div>
                        </div>

                        {/* Security Label */}
                        <div className="flex items-start rounded-xl bg-slate-50 p-3 text-xs text-gray-500">
                          <ShieldCheck className="mr-2 h-4 w-4 shrink-0 text-[#7C3AED]" />
                          <span>
                            HIPAA Compliant & Encrypted. Your personal information is kept strictly private.
                          </span>
                        </div>

                        <div className="mt-6 flex justify-between items-center pt-2">
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="text-sm font-semibold text-[#7C3AED] hover:underline"
                          >
                            Back to Scheduling
                          </button>

                          <button
                            type="submit"
                            disabled={isSubmitting || !patientName || !patientPhone}
                            className={`rounded-full bg-[#7C3AED] px-6 py-2.5 text-sm font-semibold text-white transition-all ${
                              isSubmitting || !patientName || !patientPhone
                                ? 'opacity-60 cursor-not-allowed'
                                : 'hover:bg-[#6D28D9] hover:shadow-lg'
                            }`}
                          >
                            {isSubmitting ? 'Securing Slot...' : 'Confirm Appointment'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
