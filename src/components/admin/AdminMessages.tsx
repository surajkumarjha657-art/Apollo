import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  Search, 
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockService } from '../../services/mockData';
import { ContactMessage } from '../../types';

const AdminMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const unsubscribe = mockService.subscribe('messages', (docs) => {
      setMessages(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await mockService.deleteItem('messages', id);
      } catch (err) {
        console.error('Error deleting message:', err);
      }
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    msg.phone.includes(searchTerm) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Messages</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage patient inquiries from the contact form.</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl outline-none focus:ring-2 focus:ring-medical-blue transition-all dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Messages Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : paginatedMessages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {paginatedMessages.map((msg) => (
            <div key={msg.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-medical-light dark:bg-medical-blue/10 text-medical-blue rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{msg.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                      <Phone className="w-3 h-3 mr-1" /> {msg.phone}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(msg.id!)}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {msg.message}
                </p>
              </div>

              <div className="flex items-center text-xs text-slate-400 dark:text-slate-500">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm">
          <MessageSquare className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Messages Yet</h3>
          <p className="text-slate-500 dark:text-slate-400">Patient inquiries will appear here.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-slate-700 transition-colors dark:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg disabled:opacity-50 hover:bg-white dark:hover:bg-slate-700 transition-colors dark:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
