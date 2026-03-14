import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { mockService } from '../services/mockData';
import { BlogPost } from '../types';

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await mockService.getItems('blog');
        setPosts(data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest Health Insights</h2>
            <p className="text-slate-600">
              Stay informed with the latest medical news, health tips, and wellness advice from our expert medical team.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-medical-blue font-bold hover:underline group"
          >
            <span>View All Articles</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500"
            >
              <div className="h-56 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-bold text-medical-blue uppercase tracking-wider shadow-lg">
                  {post.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center"><User className="w-3 h-3 mr-1.5 text-medical-blue" /> {post.author}</span>
                  <span className="flex items-center"><Calendar className="w-3 h-3 mr-1.5 text-medical-blue" /> {post.date}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-medical-blue transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center space-x-2 text-medical-blue font-bold text-xs group/btn"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
