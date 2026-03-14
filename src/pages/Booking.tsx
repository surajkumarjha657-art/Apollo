import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { mockService } from '../services/mockData';
import { CLINIC_SERVICES, Appointment } from '../types';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle2, Loader2, ChevronRight, AlertCircle } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedService = location.state?.service || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    service: preselectedService,
    date: '',
    time: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    try {
      const appointmentData: Appointment = {
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await mockService.addItem('appointments', appointmentData);
      setStatus('success');
      
      // Auto redirect after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (err: any) {
      console.error("Booking Error:", err);
      setStatus('error');
      setError(err.message || "Failed to book appointment. Please try again.");
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center medical-card p-12"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Booked!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you, <span className="font-bold text-slate-900">{formData.fullName}</span>. Your appointment for <span className="font-bold text-slate-900">{formData.service}</span> has been received. Our team will contact you shortly to confirm.
          </p>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Back to Home
            </button>
            <p className="text-xs text-slate-400">Redirecting to home in 5 seconds...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side - Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <span className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-4 block">Book Your Visit</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                Schedule Your <span className="text-medical-blue">Diagnostic Test</span> Today
              </h1>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Fill out the form to request an appointment. Our staff will review your request and get back to you with a confirmation.
              </p>

              <div className="space-y-6">
                {[
                  { title: 'Choose Service', desc: 'Select from our wide range of diagnostic tests.', icon: <ActivityIcon className="w-5 h-5" /> },
                  { title: 'Pick Date & Time', desc: 'Select a slot that works best for your schedule.', icon: <Calendar className="w-5 h-5" /> },
                  { title: 'Get Confirmation', desc: 'Our team will call you to finalize the booking.', icon: <CheckCircle2 className="w-5 h-5" /> },
                ].map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-medical-blue shrink-0">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{step.title}</h4>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-medical-blue rounded-3xl text-white">
                <p className="text-sm font-medium opacity-80 mb-2">Need Help Booking?</p>
                <p className="text-2xl font-bold mb-4">Call: 07807050555</p>
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Available Mon-Sat: 9am - 8pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="medical-card p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                      <User className="w-4 h-4 text-medical-blue" />
                      <span>Full Name</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                      <Phone className="w-4 h-4 text-medical-blue" />
                      <span>Phone Number</span>
                    </label>
                    <input 
                      type="tel" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                      placeholder="Enter mobile number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                      <Mail className="w-4 h-4 text-medical-blue" />
                      <span>Email Address</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                      <ActivityIcon className="w-4 h-4 text-medical-blue" />
                      <span>Select Service</span>
                    </label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all appearance-none"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="">Choose a service</option>
                      {CLINIC_SERVICES.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                      <Calendar className="w-4 h-4 text-medical-blue" />
                      <span>Preferred Date</span>
                    </label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                      <Clock className="w-4 h-4 text-medical-blue" />
                      <span>Preferred Time</span>
                    </label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all appearance-none"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="">Choose a time slot</option>
                      <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                      <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 04:00 PM">03:00 PM - 04:00 PM</option>
                      <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                      <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
                      <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                      <option value="07:00 PM - 08:00 PM">07:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-bold text-slate-700">
                    <MessageSquare className="w-4 h-4 text-medical-blue" />
                    <span>Additional Message (Optional)</span>
                  </label>
                  <textarea 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                    placeholder="Tell us about your symptoms or requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-primary w-full flex items-center justify-center space-x-2 py-5 text-lg shadow-lg shadow-blue-200"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Processing Booking...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm Appointment</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export default Booking;
