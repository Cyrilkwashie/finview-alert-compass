
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Transactions from './pages/Transactions';
import Alerts from './pages/Alerts';
import CustomerProfiles from './pages/CustomerProfiles';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import RulesEngine from './pages/RulesEngine';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/customer-profiles" element={<CustomerProfiles />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/rules-engine" element={<RulesEngine />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
