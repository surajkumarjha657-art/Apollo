import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  Zap, 
  Heart, 
  Waves, 
  Wind, 
  Stethoscope, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import { CLINIC_SERVICES } from '../types';

const Services = () => {
  const serviceDetails = [
    { 
      title: 'X Ray', 
      icon: <Activity className="w-8 h-8" />, 
      desc: 'Digital X-ray services providing high-resolution images for accurate bone and tissue diagnostics with minimal radiation exposure.',
      features: ['Digital Imaging', 'Quick Reports', 'Low Radiation']
    },
    { 
      title: 'Physiotherapy', 
      icon: <Zap className="w-8 h-8" />, 
      desc: 'Expert physical therapy services for sports injuries, post-surgery recovery, chronic pain management, and mobility improvement.',
      features: ['Expert Therapists', 'Personalized Plans', 'Modern Equipment']
    },
    { 
      title: 'TMT Test', 
      icon: <Heart className="w-8 h-8" />, 
      desc: 'Treadmill Test (Stress Test) to monitor heart function under physical stress and detect potential cardiovascular issues.',
      features: ['Cardiac Monitoring', 'Expert Supervision', 'Detailed Analysis']
    },
    { 
      title: 'ECG Test', 
      icon: <Heart className="w-8 h-8" />, 
      desc: 'Electrocardiogram to record the electrical activity of your heart, helping diagnose heart attacks, arrhythmias, and other conditions.',
      features: ['Instant Results', 'Accurate Readings', 'Heart Health Check']
    },
    { 
      title: '2D Echo Test', 
      icon: <Waves className="w-8 h-8" />, 
      desc: 'Echocardiogram using ultrasound to create images of the heart, allowing doctors to see the heart beating and pumping blood.',
      features: ['Heart Structure View', 'Valve Assessment', 'Non-Invasive']
    },
    { 
      title: 'Ultrasound', 
      icon: <Stethoscope className="w-8 h-8" />, 
      desc: 'High-frequency sound waves to create images of organs and structures inside the body for various diagnostic purposes.',
      features: ['Abdominal Scan', 'Pelvic Scan', 'Pregnancy Scan']
    },
    { 
      title: 'PFT Test', 
      icon: <Wind className="w-8 h-8" />, 
      desc: 'Pulmonary Function Tests to measure how well your lungs work, including how much air they can hold and how quickly you can breathe.',
      features: ['Lung Capacity', 'Asthma Check', 'Respiratory Health']
    },
  ];

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
            Our Medical Services
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive diagnostic and therapeutic services delivered with precision and care.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="medical-card flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-medical-light text-medical-blue rounded-2xl flex items-center justify-center mb-8">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                {service.desc}
              </p>
              <div className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 bg-medical-blue rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link 
                to="/book" 
                state={{ service: service.title }}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book {service.title}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-medical-blue rounded-[3rem] p-12 md:p-20 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Diagnostic Package?</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto">
            Contact us today to discuss your healthcare needs and we'll help you choose the right diagnostic services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/contact" className="bg-white text-medical-blue px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors">
              Contact Us
            </Link>
            <a href="tel:07807050555" className="border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/10 transition-colors">
              Call Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
