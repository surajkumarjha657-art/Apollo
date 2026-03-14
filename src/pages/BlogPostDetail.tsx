import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Tag,
  Share2,
  Clock
} from 'lucide-react';
import { mockService } from '../services/mockData';
import { BlogPost } from '../types';

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await mockService.getItems('blog');
        const found = posts.find((p: BlogPost) => p.id === id);
        if (found) {
          setPost(found);
        } else {
          navigate('/blog');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-medical-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen pt-24 pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/blog" 
          className="inline-flex items-center space-x-2 text-slate-500 hover:text-medical-blue font-bold text-sm mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Blog</span>
        </Link>

        {/* Post Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-medical-light text-medical-blue rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Tag className="w-3 h-3" />
            <span>{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 uppercase tracking-widest">{post.author}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Medical Expert</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="flex items-center"><Calendar className="w-3 h-3 mr-2 text-medical-blue" /> {post.date}</span>
              <span className="flex items-center"><Clock className="w-3 h-3 mr-2 text-medical-blue" /> 5 Min Read</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[3rem] overflow-hidden mb-12 shadow-2xl shadow-slate-200"
        >
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Post Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 italic">
            {post.excerpt}
          </p>
          <div className="text-slate-700 leading-loose space-y-6 whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-10 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share:</span>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-medical-blue hover:text-white transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          <Link to="/book" className="btn-primary px-8 py-4">
            Book Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
