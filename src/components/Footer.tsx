import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Clinic Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-white font-bold text-xl">Apollo Clinic</span>
            </div>
            <p className="text-sm leading-relaxed">
              Trusted diagnostic and healthcare services in New Delhi. We provide high-quality medical testing and physiotherapy with state-of-the-art equipment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-medical-blue transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-medical-blue transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-medical-blue transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-medical-blue transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-medical-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-medical-blue transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">Our Services</Link></li>
              <li><Link to="/blog" className="hover:text-medical-blue transition-colors">Medical Blog</Link></li>
              <li><Link to="/book" className="hover:text-medical-blue transition-colors">Book Appointment</Link></li>
              <li><Link to="/contact" className="hover:text-medical-blue transition-colors">Contact Us</Link></li>
              <li><Link to="/admin/login" className="hover:text-medical-blue transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">X-Ray Diagnostics</Link></li>
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">ECG & TMT Test</Link></li>
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">Ultrasound Scan</Link></li>
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">2D Echo Test</Link></li>
              <li><Link to="/services" className="hover:text-medical-blue transition-colors">PFT Test</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-medical-blue shrink-0" />
                <span>205, Tansen Marg, Opp. FICCI Auditorium, Mandi House, New Delhi, Delhi 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-medical-blue shrink-0" />
                <a href="tel:07807050555" className="hover:text-medical-blue transition-colors">07807050555</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-medical-blue shrink-0" />
                <span>info@apolloclinicdelhi.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-medical-blue shrink-0" />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Apollo Clinic New Delhi. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-medical-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-medical-blue transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
