import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  FileText,
  Save,
  Image as ImageIcon,
  User,
  Tag,
  Calendar
} from 'lucide-react';
import { mockService } from '../../services/mockData';
import { BlogPost } from '../../types';

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    const unsubscribe = mockService.subscribe('blog', (docs) => {
      setPosts(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await mockService.updateItem('blog', editingPost.id!, formData);
      } else {
        await mockService.addItem('blog', formData);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving blog post:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await mockService.deleteItem('blog', id);
      } catch (err) {
        console.error('Error deleting blog post:', err);
      }
    }
  };

  const openModal = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        image: post.image,
        date: post.date
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: 'Admin',
        category: 'Health',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Create and manage health-related articles for your patients.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn-primary flex items-center space-x-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          <span>New Article</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden group">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 dark:bg-slate-800/90 rounded-lg text-[10px] font-bold text-medical-blue uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{post.title}</h3>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => openModal(post)}
                        className="p-1.5 text-slate-400 hover:text-medical-blue hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id!)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {post.author}</span>
                      <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {editingPost ? 'Edit Article' : 'Create New Article'}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                  placeholder="e.g., Understanding Digital X-Rays"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Excerpt (Short Summary)</label>
                <textarea 
                  required
                  rows={2}
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white resize-none"
                  placeholder="A brief summary of the article..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Content</label>
                <textarea 
                  required
                  rows={6}
                  className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white resize-none"
                  placeholder="Write the full article content here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                    placeholder="e.g., Health, Recovery"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Author</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                    placeholder="e.g., Dr. Sharma"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Image URL</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Publish Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl py-4 px-5 text-sm outline-none focus:ring-2 focus:ring-medical-blue dark:text-white"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                  <span>{editingPost ? 'Update Article' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
