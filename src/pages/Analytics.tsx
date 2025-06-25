
import React from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  AlertTriangle,
  Users,
  DollarSign,
  Clock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const Analytics = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Advanced Analytics</h1>
              <p className="text-slate-400 mt-1">Behavioral analysis and predictive insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Detection Rate</p>
                  <p className="text-3xl font-bold text-white mt-2">94.2%</p>
                  <p className="text-sm mt-2 text-green-400">+2.1% this month</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-green-500">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">False Positives</p>
                  <p className="text-3xl font-bold text-white mt-2">3.8%</p>
                  <p className="text-sm mt-2 text-green-400">-0.5% improvement</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-yellow-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Processing Time</p>
                  <p className="text-3xl font-bold text-white mt-2">1.2s</p>
                  <p className="text-sm mt-2 text-green-400">-0.3s faster</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-blue-500">
                  <Clock className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium">Model Accuracy</p>
                  <p className="text-3xl font-bold text-white mt-2">96.7%</p>
                  <p className="text-sm mt-2 text-green-400">+1.4% this week</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-700/50 text-purple-500">
                  <BarChart3 className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Score Distribution */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Risk Score Distribution
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Low Risk (0-40)</span>
                    <span className="text-sm font-medium text-green-400">62%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Medium Risk (41-70)</span>
                    <span className="text-sm font-medium text-yellow-400">26%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '26%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">High Risk (71-90)</span>
                    <span className="text-sm font-medium text-orange-400">9%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">Critical Risk (91-100)</span>
                    <span className="text-sm font-medium text-red-400">3%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert Trends */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Alert Trends (30 Days)
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">AML Alerts</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">156</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Fraud Alerts</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">89</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Sanctions</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">34</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">KYC Issues</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-slate-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-white">23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Behavioral Patterns */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Behavioral Analysis Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">Transaction Velocity</h4>
                <p className="text-2xl font-bold text-blue-400 mb-1">+23%</p>
                <p className="text-xs text-slate-400">Above normal pattern detected in 12 customers</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">Geographic Anomalies</h4>
                <p className="text-2xl font-bold text-yellow-400 mb-1">8</p>
                <p className="text-xs text-slate-400">Unusual location patterns this week</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-white mb-2">Network Connections</h4>
                <p className="text-2xl font-bold text-purple-400 mb-1">45</p>
                <p className="text-xs text-slate-400">Potential connected accounts identified</p>
              </div>
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">ML Model Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-white">AML Detection Model</h4>
                  <p className="text-xs text-slate-400">Last updated: 2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">96.2%</p>
                  <p className="text-xs text-slate-400">Accuracy</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-white">Fraud Detection Model</h4>
                  <p className="text-xs text-slate-400">Last updated: 4 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">94.8%</p>
                  <p className="text-xs text-slate-400">Accuracy</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-white">Risk Scoring Model</h4>
                  <p className="text-xs text-slate-400">Last updated: 6 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-400">91.5%</p>
                  <p className="text-xs text-slate-400">Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
