import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Stethoscope, 
  Activity, 
  Heart, 
  Shield, 
  Zap, 
  Dna, 
  Microscope,
  Save
} from 'lucide-react';
import { mockService } from '../../services/mockData';
import { Service } from '../../types';

const ICONS = {
  Stethoscope,
  Activity,
  Heart,
  Shield,
  Zap,
  Dna,
  Microscope
};

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Stethoscope',
    price: ''
  });

  useEffect(() => {
    const unsubscribe = mockService.subscribe('services', (docs) => {
      setServices(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService) {
        await mockService.updateItem('services', editingService.id!, formData);
      } else {
        await mockService.addItem('services', formData);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving service:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await mockService.deleteItem('services', id);
      } catch (err) {
        console.error('Error deleting service:', err);
      }
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description,
        icon: service.icon,
        price: service.price || ''
      });
    } else {
      setEditingService(null);
      setFormData({ name: '', description: '', icon: 'Stethoscope', price: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Services Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Add or edit the medical services offered by the clinic.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn-primary flex items-center space-x-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Service</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = (ICONS as any)[service.icon] || Stethoscope;
            return (
              <div key={service.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-medical-light dark:bg-medical-blue/10 text-medical-blue rounded-xl">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openModal(service)}
                      className="p-2 text-slate-400 hover:text-medical-blue hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id!)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{service.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">{service.description}</p>
                {service.price && (
                  <p className="text-medical-blue font-bold text-sm">Starting from {service.price}</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Service Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                  placeholder="e.g., Digital X-Ray"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white resize-none"
                  placeholder="Describe the service..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Icon</label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  >
                    {Object.keys(ICONS).map(icon => <option key={icon} value={icon}>{icon}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Price (Optional)</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                    placeholder="e.g., ₹500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-4 flex space-x-4">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 btn-primary flex items-center justify-center space-x-2 py-4"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingService ? 'Update Service' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
