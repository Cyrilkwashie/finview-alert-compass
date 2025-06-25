
import React, { useState } from 'react';
import { X, MessageSquare, FileText, Calendar, User, Save } from 'lucide-react';

interface AlertInvestigationProps {
  alert: {
    id: string;
    type: string;
    title: string;
    customer: string;
    priority: string;
    status: string;
    amount: string;
    createdAt: string;
    assignedTo: string;
    description: string;
    comments: number;
  };
  onClose: () => void;
}

const AlertInvestigation: React.FC<AlertInvestigationProps> = ({ alert, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [status, setStatus] = useState(alert.status);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      message: 'Initial investigation started. Reviewing transaction patterns.',
      timestamp: '2024-01-15 15:30'
    },
    {
      id: 2,
      author: 'Mike Chen',
      message: 'Found additional suspicious transactions from the same customer.',
      timestamp: '2024-01-15 16:45'
    }
  ]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: 'Current User',
        message: newComment,
        timestamp: new Date().toLocaleString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Alert Investigation - {alert.id}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Alert Overview */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">{alert.title}</h3>
            <p className="text-slate-300 mb-4">{alert.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-slate-400">Customer:</span>
                <div className="text-white font-medium">{alert.customer}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Amount:</span>
                <div className="text-white font-medium">{alert.amount}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Priority:</span>
                <div className="text-white font-medium capitalize">{alert.priority}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Assigned To:</span>
                <div className="text-white font-medium">{alert.assignedTo}</div>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Status Management</h3>
            <div className="flex items-center space-x-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="open">Open</option>
                <option value="investigating">Investigating</option>
                <option value="escalated">Escalated</option>
                <option value="resolved">Resolved</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Update Status</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-slate-900 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Investigation Comments</h3>
            
            <div className="space-y-4 mb-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-slate-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{comment.author}</span>
                    <span className="text-slate-400 text-sm">{comment.timestamp}</span>
                  </div>
                  <p className="text-slate-300">{comment.message}</p>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add investigation comment..."
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Add Comment</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
              Create SAR Report
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors">
              Escalate to Senior
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Generate Case Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertInvestigation;
