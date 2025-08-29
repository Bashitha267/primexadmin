import { Briefcase, Calendar, Globe, Palette, TrendingUp, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DashboardStats } from '../types';
import { storageUtils } from '../utils/storage';

export const Dashboard: React.FC = () => {
  const getStats = (): DashboardStats => {
    const webProjects = storageUtils.getWebProjects().length;
    const events = storageUtils.getEvents().length;
    const graphicDesigns = storageUtils.getGraphicDesigns().length;
    
    return {
      webProjects,
      events,
      graphicDesigns,
      totalProjects: webProjects + events + graphicDesigns
    };
  };

  const stats = getStats();

  const statCards = [
    {
      title: 'Web Projects',
      value: stats.webProjects,
      icon: Briefcase,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Events Covered',
      value: stats.events,
      icon: Calendar,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Graphic Designs',
      value: stats.graphicDesigns,
      icon: Palette,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: TrendingUp,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    }
  ];

  const recentActivities = [
    { action: 'New web project added', time: '2 hours ago', type: 'web' },
    { action: 'Event documentation completed', time: '4 hours ago', type: 'event' },
    { action: 'Logo design uploaded', time: '6 hours ago', type: 'graphic' },
    { action: 'Client meeting scheduled', time: '1 day ago', type: 'meeting' }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome to Prime X Studio Admin Panel</p>
            </div>
            <div className="flex items-center space-x-2 text-red-600">
              <Globe size={24} />
              <span className="font-medium"><a href='www.primexstudio.lk'>www.primexstudio.lk</a></span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className={`${stat.bgColor} rounded-xl p-6 border border-opacity-20 hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </div>
                </div>
              </div>
              <h3 className={`font-semibold ${stat.textColor}`}>{stat.title}</h3>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-2 text-red-600" size={20} />
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{activity.action}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="mr-2 text-red-600" size={20} />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 hover:border-red-300"><Link to='/add-web-project'>
                <div className="font-medium text-red-700">Add a webproject</div>
                <div className="text-red-600 text-sm">Upload your latest web development work</div></Link>
              </button>
              <button className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200 hover:border-green-300"><Link to='/add-event'>
                <div className="font-medium text-green-700">Document New Event</div>
                <div className="text-green-600 text-sm">Add event coverage and photos</div></Link>
              </button>
              <button className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200 hover:border-purple-300"><Link to='/add-graphic-design'> 
                <div className="font-medium text-purple-700">Upload Design Work</div>
                <div className="text-purple-600 text-sm">Add graphic designs to portfolio</div></Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};