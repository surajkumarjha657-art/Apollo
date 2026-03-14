import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockService } from '../../services/mockData';
import { Appointment } from '../../types';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
    completed: 0
  });
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const appointments = await mockService.getItems('appointments');
        const today = new Date().toISOString().split('T')[0];
        
        setStats({
          total: appointments.length,
          today: appointments.filter((a: any) => a.date === today).length,
          upcoming: appointments.filter((a: any) => a.status === 'confirmed').length,
          completed: appointments.filter((a: any) => a.status === 'completed').length
        });

        setRecentAppointments(appointments.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: 'Jan', appointments: 45 },
    { name: 'Feb', appointments: 52 },
    { name: 'Mar', appointments: 48 },
    { name: 'Apr', appointments: 61 },
    { name: 'May', appointments: 55 },
    { name: 'Jun', appointments: 67 },
  ];

  const serviceData = [
    { name: 'X-Ray', value: 400 },
    { name: 'Physio', value: 300 },
    { name: 'ECG', value: 300 },
    { name: 'Ultrasound', value: 200 },
  ];

  const COLORS = ['#0B6BCE', '#10B981', '#F59E0B', '#EF4444'];

  const statCards = [
    { title: 'Total Appointments', value: stats.total, icon: Users, color: 'blue', trend: '+12%' },
    { title: "Today's Appointments", value: stats.today, icon: Clock, color: 'amber', trend: '+5%' },
    { title: 'Upcoming Bookings', value: stats.upcoming, icon: Calendar, color: 'emerald', trend: '+8%' },
    { title: 'Completed Sessions', value: stats.completed, icon: CheckCircle, color: 'indigo', trend: '+15%' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-${card.color}-50 dark:bg-${card.color}-900/20 text-${card.color}-600`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {card.trend}
                </div>
              </div>
              <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.title}</h3>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Appointments</h3>
            <select className="bg-slate-50 dark:bg-slate-700 border-none text-xs font-bold rounded-lg px-3 py-1.5 outline-none dark:text-white">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6BCE" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6BCE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="appointments" stroke="#0B6BCE" strokeWidth={3} fillOpacity={1} fill="url(#colorApp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-8">Service Popularity</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 ml-8">
              {serviceData.map((item, i) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Appointments</h3>
          <Link to="/admin/appointments" className="text-medical-blue text-sm font-bold hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {recentAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-medical-light text-medical-blue rounded-full flex items-center justify-center font-bold text-xs">
                        {app.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{app.fullName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{app.phoneNumber}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{app.service}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-900 dark:text-white">{app.date}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{app.time}</p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
