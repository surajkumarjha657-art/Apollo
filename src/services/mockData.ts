
// Mock Data Service to replace Firebase
// This uses localStorage to persist data for the demo

const MOCK_DELAY = 500;

const getStorageItem = (key: string, defaultValue: any) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initial Data
const INITIAL_SERVICES = [
  { id: '1', name: 'General Consultation', description: 'Comprehensive health checkup and medical advice.', price: 500, icon: 'Stethoscope' },
  { id: '2', name: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents.', price: 600, icon: 'Baby' },
  { id: '3', name: 'Cardiology', description: 'Heart health monitoring and diagnostic services.', price: 1200, icon: 'HeartPulse' },
  { id: '4', name: 'Orthopedics', description: 'Treatment for bone, joint, and muscle conditions.', price: 1000, icon: 'Activity' },
  { id: '5', name: 'Dermatology', description: 'Expert care for skin, hair, and nail conditions.', price: 800, icon: 'User' },
  { id: '6', name: 'Laboratory Services', description: 'Advanced diagnostic testing and blood work.', price: 400, icon: 'FlaskConical' }
];

const INITIAL_BLOG_POSTS = [
  { 
    id: '1', 
    title: 'Understanding Digital X-Rays', 
    excerpt: 'Learn about the benefits of digital X-rays and why they are safer than traditional methods.',
    content: 'Digital radiography is a form of X-ray imaging, where digital X-ray sensors are used instead of traditional photographic film. Advantages include time efficiency through bypassing chemical processing and the ability to digitally transfer and enhance images. Also, less radiation can be used to produce an image of similar contrast to conventional radiography.',
    author: 'Dr. Sharma',
    category: 'Diagnostics',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-12',
    createdAt: new Date().toISOString()
  },
  { 
    id: '2', 
    title: 'Benefits of Early Physiotherapy', 
    excerpt: 'Discover how starting physiotherapy early can significantly speed up your recovery process.',
    content: 'Physiotherapy helps to restore movement and function when someone is affected by injury, illness or disability. It can also help to reduce your risk of injury or illness in the future. It takes a holistic approach that involves the patient directly in their own care.',
    author: 'Dr. Verma',
    category: 'Recovery',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    date: '2024-03-10',
    createdAt: new Date().toISOString()
  }
];

const INITIAL_SETTINGS = {
  clinicName: 'Apollo Clinic',
  phone: '+91 78070 50555',
  address: 'Main Road, Near City Center, Shimla, HP',
  email: 'info@apolloclinic.com',
  workingHours: 'Mon - Sat: 9:00 AM - 8:00 PM',
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3416.0716474134!2d77.1685!3d31.1048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA2JzE3LjMiTiA3N8KwMTAnMDYuNiJF!5e0!3m2!1sen!2sin!4v1647250000000!5m2!1sen!2sin'
};

// Initialize Storage
if (!localStorage.getItem('clinic_services')) setStorageItem('clinic_services', INITIAL_SERVICES);
if (!localStorage.getItem('clinic_appointments')) setStorageItem('clinic_appointments', []);
if (!localStorage.getItem('clinic_messages')) setStorageItem('clinic_messages', []);
if (!localStorage.getItem('clinic_settings')) setStorageItem('clinic_settings', INITIAL_SETTINGS);
if (!localStorage.getItem('clinic_blog')) setStorageItem('clinic_blog', INITIAL_BLOG_POSTS);
if (!localStorage.getItem('clinic_admin')) setStorageItem('clinic_admin', { id: 'Admin123', password: 'jhajha123' });

export const mockService = {
  // Auth
  login: async (id: string, pass: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const admin = getStorageItem('clinic_admin', {});
    if (id === admin.id && pass === admin.password) {
      const user = { uid: 'admin-uid', email: 'admin123@apolloclinic.com', displayName: 'Admin' };
      localStorage.setItem('clinic_session', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  logout: () => {
    localStorage.removeItem('clinic_session');
  },
  getCurrentUser: () => {
    const session = localStorage.getItem('clinic_session');
    return session ? JSON.parse(session) : null;
  },

  // Generic CRUD
  getItems: async (collection: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    return getStorageItem(`clinic_${collection}`, []);
  },
  addItem: async (collection: string, item: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const items = getStorageItem(`clinic_${collection}`, []);
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9), createdAt: new Date().toISOString() };
    setStorageItem(`clinic_${collection}`, [newItem, ...items]);
    return newItem;
  },
  updateItem: async (collection: string, id: string, updates: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const items = getStorageItem(`clinic_${collection}`, []);
    const updatedItems = items.map((item: any) => item.id === id ? { ...item, ...updates } : item);
    setStorageItem(`clinic_${collection}`, updatedItems);
  },
  deleteItem: async (collection: string, id: string) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    const items = getStorageItem(`clinic_${collection}`, []);
    const filteredItems = items.filter((item: any) => item.id !== id);
    setStorageItem(`clinic_${collection}`, filteredItems);
  },

  // Settings
  getSettings: async () => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    return getStorageItem('clinic_settings', INITIAL_SETTINGS);
  },
  updateSettings: async (settings: any) => {
    await new Promise(r => setTimeout(r, MOCK_DELAY));
    setStorageItem('clinic_settings', settings);
  },

  // Real-time simulation (simplified)
  subscribe: (collection: string, callback: (items: any[]) => void) => {
    const items = getStorageItem(`clinic_${collection}`, []);
    callback(items);
    
    // Check for changes every 2 seconds (very basic simulation)
    const interval = setInterval(() => {
      const currentItems = getStorageItem(`clinic_${collection}`, []);
      callback(currentItems);
    }, 2000);
    
    return () => clearInterval(interval);
  }
};
