import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Home, Briefcase, Calendar, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/add-web-project', icon: Briefcase, label: 'Web Projects' },
    { to: '/add-event', icon: Calendar, label: 'Events' },
    { to: '/add-graphic-design', icon: Palette, label: 'Graphics' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors">
              Prime X Studio
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === to
                      ? 'bg-red-50 text-red-600 shadow-sm'
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};