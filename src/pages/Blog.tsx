import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Search,
  Tag,
  ChevronRight
} from 'lucide-react';
import { mockService } from '../services/mockData';
import { BlogPost } from '../types';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await mockService.getItems('blog');
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-medical-light text-medical-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Tag className="w-3 h-3" />
            <span>Health Insights</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Our Medical <span className="text-medical-blue">Blog</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Stay updated with the latest health tips, medical advancements, and clinic news from our expert team.
          </motion.p>
        </div>

        {/* Search & Categories */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-medical-blue transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Diagnostics', 'Recovery', 'Health', 'Clinic News'].map((cat) => (
              <button 
                key={cat}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  searchTerm === cat ? 'bg-medical-blue text-white shadow-lg shadow-blue-200' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                }`}
                onClick={() => setSearchTerm(cat === 'All' ? '' : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-xs font-bold text-medical-blue uppercase tracking-wider shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span className="flex items-center"><User className="w-3 h-3 mr-1.5 text-medical-blue" /> {post.author}</span>
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5 text-medical-blue" /> {post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-medical-blue transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center space-x-2 text-medical-blue font-bold text-sm group/btn"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
            <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Articles Found</h3>
            <p className="text-slate-500">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
