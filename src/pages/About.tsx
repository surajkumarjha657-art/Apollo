import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Award, Microscope, Heart, Activity } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-10 pb-24">
      {/* Hero Header */}
      <section className="bg-medical-light py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            About Apollo Clinic
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Providing world-class diagnostic and healthcare services in the heart of New Delhi since 2010.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission & Vision</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-medical-blue p-3 rounded-xl text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Patient-First Care</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Our mission is to provide accessible, high-quality healthcare and diagnostic services with a focus on patient comfort and accurate results.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-medical-blue p-3 rounded-xl text-white">
                  <Microscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Technological Excellence</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We envision becoming the leading diagnostic center in New Delhi by continuously upgrading our technology and expertise.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
              alt="Clinic Interior" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {[
            { label: 'Years Experience', value: '15+' },
            { label: 'Expert Doctors', value: '25+' },
            { label: 'Diagnostic Tests', value: '100+' },
            { label: 'Patients Served', value: '50k+' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-4xl font-extrabold text-medical-blue mb-2">{stat.value}</p>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600">The principles that guide our healthcare delivery every day.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Integrity', desc: 'We maintain the highest ethical standards in all our medical practices.', icon: <Shield className="w-8 h-8" /> },
              { title: 'Compassion', desc: 'We treat every patient with empathy, respect, and personalized care.', icon: <Users className="w-8 h-8" /> },
              { title: 'Innovation', desc: 'We embrace the latest medical advancements to improve patient outcomes.', icon: <Award className="w-8 h-8" /> },
            ].map((value, i) => (
              <div key={i} className="medical-card text-center">
                <div className="w-16 h-16 bg-medical-light text-medical-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Section */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Modern Diagnostic Equipment</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                We invest in the latest medical technology to ensure that our patients receive the most accurate and timely diagnostic results possible. From digital X-rays to advanced ultrasound machines, our facility is fully equipped.
              </p>
              <ul className="space-y-4">
                {['Digital X-Ray Systems', 'Advanced 2D Echo Machines', 'High-Resolution Ultrasound', 'Modern TMT & ECG Units'].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-medical-blue" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=500" alt="Equipment 1" className="rounded-2xl h-48 w-full object-cover" referrerPolicy="no-referrer" />
              <img src="https://images.unsplash.com/photo-1581093458791-9f3c3250bb8b?auto=format&fit=crop&q=80&w=500" alt="Equipment 2" className="rounded-2xl h-48 w-full object-cover mt-8" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-medical-blue/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        </section>
      </div>
    </div>
  );
};

export default About;
