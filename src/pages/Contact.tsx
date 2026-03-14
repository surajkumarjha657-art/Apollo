import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { mockService } from '../services/mockData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await mockService.addItem('messages', {
        ...formData,
        phone: 'Not provided', // Contact form doesn't have phone, but admin panel expects it
        createdAt: new Date().toISOString()
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <div className="pt-10 pb-24">
      {/* Header */}
      <section className="bg-medical-light py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Contact Us
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out to us via phone, email, or visit our clinic.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="medical-card">
              <div className="flex items-start space-x-4">
                <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Our Location</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    205, Tansen Marg, Opp. FICCI Auditorium, Mandi House, New Delhi, Delhi 110001
                  </p>
                </div>
              </div>
            </div>

            <div className="medical-card">
              <div className="flex items-start space-x-4">
                <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Phone Number</h4>
                  <a href="tel:07807050555" className="text-sm text-slate-600 hover:text-medical-blue transition-colors">
                    07807050555
                  </a>
                </div>
              </div>
            </div>

            <div className="medical-card">
              <div className="flex items-start space-x-4">
                <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Email Address</h4>
                  <p className="text-sm text-slate-600">info@apolloclinicdelhi.com</p>
                </div>
              </div>
            </div>

            <div className="medical-card">
              <div className="flex items-start space-x-4">
                <div className="bg-medical-light p-3 rounded-xl text-medical-blue">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Business Hours</h4>
                  <p className="text-sm text-slate-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-sm text-slate-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="medical-card p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a Message</h3>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                  <p className="text-slate-600 mb-8">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Full Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Subject</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Message</label>
                    <textarea 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none"
                      placeholder="Your message here..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="btn-primary w-full flex items-center justify-center space-x-2 py-4"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="mt-24 rounded-[3rem] overflow-hidden shadow-2xl h-[500px] border border-slate-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.123456789012!2d77.23456789012345!3d28.62345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sApollo%20Clinic!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Apollo Clinic Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
