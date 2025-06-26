import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Shield, 
  AlertTriangle, 
  CreditCard, 
  Users, 
  FileText, 
  Settings, 
  TrendingUp,
  Filter
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Flagged Transactions', href: '/transactions', icon: CreditCard },
    { name: 'Transactions by Rule', href: '/transactions-by-rule', icon: Filter },
    { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
    { name: 'Rules Engine', href: '/rules', icon: Shield },
    { name: 'Customer Profiles', href: '/customers', icon: Users },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">FinSecure</h1>
            <p className="text-xs text-slate-400">AML Compliance</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-slate-300">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-slate-400">Compliance Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
