import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Calendar as CalendarIcon,
  Phone,
  Mail,
  Clock
} from 'lucide-react';
import { mockService } from '../../services/mockData';
import { Appointment, CLINIC_SERVICES } from '../../types';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const unsubscribe = mockService.subscribe('appointments', (docs) => {
      setAppointments(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await mockService.updateItem('appointments', id, { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await mockService.deleteItem('appointments', id);
      } catch (err) {
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.phoneNumber.includes(searchTerm) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesService = serviceFilter === 'all' || app.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Appointment Management</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage all patient bookings.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone or email..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue transition-all dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <select 
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="all">All Services</option>
            {CLINIC_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-8 h-8 border-4 border-medical-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </td>
                </tr>
              ) : paginatedAppointments.length > 0 ? (
                paginatedAppointments.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-medical-light text-medical-blue rounded-full flex items-center justify-center font-bold">
                          {app.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{app.fullName}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                              <Phone className="w-3 h-3 mr-1" /> {app.phoneNumber}
                            </span>
                            <span className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                              <Mail className="w-3 h-3 mr-1" /> {app.email}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-lg">
                        {app.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-slate-900 dark:text-white">
                          <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                          {app.date}
                        </div>
                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-4 h-4 mr-2 text-slate-400" />
                          {app.time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                        app.status === 'confirmed' ? 'bg-blue-50 text-blue-600' :
                        app.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {app.status === 'pending' && (
                          <button 
                            onClick={() => handleStatusUpdate(app.id!, 'confirmed')}
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {app.status !== 'completed' && app.status !== 'cancelled' && (
                          <button 
                            onClick={() => handleStatusUpdate(app.id!, 'completed')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                            title="Complete"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}
                        {app.status !== 'cancelled' && (
                          <button 
                            onClick={() => handleStatusUpdate(app.id!, 'cancelled')}
                            className="p-2 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(app.id!)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                    No appointments found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredAppointments.length)}</span> of <span className="font-bold text-slate-900 dark:text-white">{filteredAppointments.length}</span> results
            </p>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
