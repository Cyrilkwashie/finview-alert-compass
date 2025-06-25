
import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Shield, 
  AlertTriangle, 
  Users, 
  FileText,
  TrendingUp,
  Settings 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, current: true },
  { name: 'Transactions', icon: Activity, current: false },
  { name: 'Rules Engine', icon: Shield, current: false },
  { name: 'Alerts & Cases', icon: AlertTriangle, current: false },
  { name: 'Customer Profiles', icon: Users, current: false },
  { name: 'Reports', icon: FileText, current: false },
  { name: 'Analytics', icon: TrendingUp, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

const Sidebar = () => {
  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 border-r border-slate-700">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">TxAnalyzer</h1>
            <p className="text-xs text-slate-400">Compliance Suite</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href="#"
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${item.current 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div>
            <p className="text-sm font-medium text-white">Compliance Officer</p>
            <p className="text-xs text-slate-400">admin@company.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
