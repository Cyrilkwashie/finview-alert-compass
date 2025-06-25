
import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar } from 'lucide-react';

interface ExportUtilityProps {
  data: any[];
  filename: string;
  type: 'transactions' | 'alerts' | 'customers' | 'reports';
}

const ExportUtility: React.FC<ExportUtilityProps> = ({ data, filename, type }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      let csvContent = '';
      
      if (type === 'transactions') {
        csvContent = 'Transaction ID,Customer,Amount,Date,Time,Risk Score,Status,Rules\n';
        data.forEach(item => {
          csvContent += `${item.id},${item.customer},"${item.amount}",${item.date},${item.time},${item.riskScore},${item.status},"${item.rules?.join('; ')}"\n`;
        });
      } else if (type === 'alerts') {
        csvContent = 'Alert ID,Type,Title,Customer,Priority,Status,Amount,Created At,Assigned To\n';
        data.forEach(item => {
          csvContent += `${item.id},${item.type},"${item.title}",${item.customer},${item.priority},${item.status},"${item.amount}",${item.createdAt},${item.assignedTo}\n`;
        });
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
    }, 1000);
  };

  const exportToPDF = () => {
    setIsExporting(true);
    
    setTimeout(() => {
      // Simulate PDF generation
      const content = `${type.toUpperCase()} REPORT\n\nGenerated on: ${new Date().toLocaleString()}\n\nTotal Records: ${data.length}\n\nThis is a sample PDF export. In a real application, this would generate a proper PDF with formatted data.`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={exportToCSV}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white rounded-lg transition-colors"
      >
        <FileSpreadsheet className="h-4 w-4" />
        <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
      </button>
      
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white rounded-lg transition-colors"
      >
        <FileText className="h-4 w-4" />
        <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
      </button>
    </div>
  );
};

export default ExportUtility;
