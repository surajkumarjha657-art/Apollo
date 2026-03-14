import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  ShieldCheck, 
  Clock, 
  Users, 
  ArrowRight, 
  Phone, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import BlogSection from '../components/BlogSection';

const Home = () => {
  const services = [
    { title: 'X-Ray', icon: <Activity className="w-6 h-6" />, desc: 'High-precision digital X-ray services.' },
    { title: 'Physiotherapy', icon: <Activity className="w-6 h-6" />, desc: 'Expert physical therapy for recovery.' },
    { title: 'ECG Test', icon: <Activity className="w-6 h-6" />, desc: 'Accurate heart rhythm monitoring.' },
    { title: 'Ultrasound', icon: <Activity className="w-6 h-6" />, desc: 'Advanced imaging for diagnostics.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-medical-light py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-white text-medical-blue rounded-full text-sm font-bold mb-6 shadow-sm">
                Best Clinic in Mandi House, Delhi
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Trusted Diagnostic & <span className="text-medical-blue">Healthcare Services</span> in New Delhi
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg">
                Apollo Clinic offers state-of-the-art X-Ray, ECG, Physiotherapy, and diagnostic services with expert care and precision.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/book" className="btn-primary flex items-center justify-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment</span>
                </Link>
                <a href="tel:07807050555" className="btn-secondary flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Medical Clinic" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-medical-blue/20 to-transparent"></div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-medical-light p-3 rounded-xl">
                    <Users className="w-6 h-6 text-medical-blue" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">10k+</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Happy Patients</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Diagnostic Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We offer a wide range of diagnostic and therapeutic services using the latest medical technology.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="medical-card group"
              >
                <div className="w-12 h-12 bg-medical-light text-medical-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{service.desc}</p>
                <Link to="/services" className="text-medical-blue font-bold text-sm flex items-center space-x-2 hover:underline">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                alt="Medical Professional" 
                className="rounded-3xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Why Choose Apollo Clinic?</h2>
              <div className="space-y-8">
                {[
                  { title: 'Advanced Equipment', desc: 'We use the latest digital diagnostic tools for accurate results.', icon: <ShieldCheck className="w-6 h-6" /> },
                  { title: 'Experienced Staff', desc: 'Our team consists of highly qualified doctors and technicians.', icon: <Users className="w-6 h-6" /> },
                  { title: 'Quick Reports', desc: 'Get your diagnostic reports delivered quickly and accurately.', icon: <Clock className="w-6 h-6" /> },
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-medical-blue">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Google Maps & Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Visit Our Clinic</h2>
              <div className="rounded-3xl overflow-hidden shadow-lg h-[400px] border border-slate-200">
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
              <div className="mt-6 flex items-center space-x-4 text-slate-600">
                <MapPin className="w-5 h-5 text-medical-blue" />
                <span>205, Tansen Marg, Opp. FICCI Auditorium, New Delhi</span>
              </div>
            </div>
            <div className="bg-medical-light rounded-3xl p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Connect With Us</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                We are located in the heart of New Delhi, easily accessible from Mandi House and surrounding areas. Visit us for world-class diagnostic and physiotherapy services.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-medical-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Call Us</p>
                    <p className="text-lg font-bold text-slate-900">07807050555</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Clock className="w-5 h-5 text-medical-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Working Hours</p>
                    <p className="text-lg font-bold text-slate-900">Mon - Sat: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <a 
                  href="https://maps.app.goo.gl/DVPX55WSX5EZervy5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-medical-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
                >
                  <span>Get Directions</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for MapPin icon missing in imports
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);

export default Home;
