import React, { useState, useEffect } from 'react';
import { Save, MapPin, Phone, MessageCircle, Globe, Building2, CheckCircle2 } from 'lucide-react';
import { mockService } from '../../services/mockData';
import { ClinicSettings } from '../../types';

const AdminSettings = () => {
  const [settings, setSettings] = useState<ClinicSettings>({
    clinicName: 'Apollo Clinic',
    phone: '07807050555',
    address: '205, Tansen Marg, Opp. FICCI Auditorium, Todermal Road Area, Mandi House, New Delhi, Delhi 110001',
    mapsLink: 'https://goo.gl/maps/example',
    whatsapp: '07807050555'
  });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await mockService.getSettings();
        if (data) {
          setSettings(data as ClinicSettings);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await mockService.updateSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Clinic Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Update your clinic's public information and contact details.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                <Building2 className="w-3 h-3 mr-1" /> Clinic Name
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white transition-all"
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                <Phone className="w-3 h-3 mr-1" /> Phone Number
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white transition-all"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                <MapPin className="w-3 h-3 mr-1" /> Address
              </label>
              <textarea 
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white transition-all resize-none"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                <Globe className="w-3 h-3 mr-1" /> Google Maps Link
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white transition-all"
                value={settings.mapsLink}
                onChange={(e) => setSettings({ ...settings, mapsLink: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1 flex items-center">
                <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp Number
              </label>
              <input 
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white transition-all"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between">
            {success ? (
              <div className="flex items-center text-emerald-600 font-bold animate-in fade-in slide-in-from-left-4">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Settings saved successfully!
              </div>
            ) : (
              <div></div>
            )}
            <button 
              type="submit"
              disabled={isSaving}
              className="btn-primary flex items-center space-x-2 px-10 py-4 shadow-xl shadow-blue-200 dark:shadow-none"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
