import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Phone, CheckCircle, Trash2, ShieldAlert } from 'lucide-react';
import { Appointment } from '../types';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export default function MyBookingsDrawer({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment
}: MyBookingsDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full"
            >
              {/* Header */}
              <div className="border-b border-gray-100 px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#1A191E]">My Scheduled Consults</h3>
                  <p className="text-xs text-gray-400">{appointments.length} active sessions</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {appointments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                    <div className="rounded-full bg-violet-50 p-4 text-[#7C3AED]">
                      <Calendar className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1A191E] text-sm">No Appointments Found</h4>
                      <p className="text-xs text-gray-400 max-w-xs mt-1">
                        You have not scheduled any health consultations yet. Book a session to view it here!
                      </p>
                    </div>
                  </div>
                ) : (
                  appointments.map((apt) => (
                    <motion.div
                      key={apt.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 relative overflow-hidden"
                    >
                      {/* Vertical status bar */}
                      <div className="absolute left-0 inset-y-0 w-1 bg-[#7C3AED]" />

                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold text-[#7C3AED]">
                            {apt.serviceType}
                          </span>
                          <h4 className="font-bold text-[#1A191E] text-sm mt-1.5">{apt.doctorName}</h4>
                          <p className="text-xs text-gray-400">{apt.specialty}</p>
                        </div>

                        <button
                          onClick={() => onCancelAppointment(apt.id)}
                          className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                          title="Cancel consultation"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Info lines */}
                      <div className="space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-3.5 w-3.5 text-[#7C3AED]" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-3.5 w-3.5 text-[#7C3AED]" />
                          <span>{apt.timeSlot}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="mr-2 h-3.5 w-3.5 text-[#7C3AED]" />
                          <span>Patient: {apt.patientName}</span>
                        </div>
                        {apt.notes && (
                          <div className="mt-2 text-[11px] bg-white border border-gray-100 rounded-lg p-2 text-gray-400 italic">
                            &ldquo;{apt.notes}&rdquo;
                          </div>
                        )}
                      </div>

                      {/* Connected status indicator */}
                      <div className="mt-4 flex items-center justify-between border-t border-dashed border-gray-200 pt-3">
                        <span className="flex items-center text-[10px] font-bold text-emerald-600">
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          CONFIRMED
                        </span>
                        <span className="text-[10px] text-gray-400">
                          ID: {apt.id.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Secure checkout footer */}
              <div className="border-t border-gray-100 p-6 bg-[#FAF9FC]">
                <div className="flex items-start">
                  <ShieldAlert className="h-5 w-5 text-violet-600 mr-2 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-400 leading-normal">
                    This consultation list is saved purely in your local browser sandbox and will persist until cache is cleared. No HIPAA metrics are sent to remote analytic monitors.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
