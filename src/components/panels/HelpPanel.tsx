import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const HelpPanel = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="flex items-center gap-2 font-medium mb-2">
          <Mail className="w-5 h-5" />
          Contact Us
        </h3>
        <p className="text-gray-600">
          For any queries, please email us at:
          <a href="mailto:pravah.founders@gmail.com" className="block text-primary hover:underline mt-1">
            pravah.founders@gmail.com
          </a>
        </p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="flex items-center gap-2 font-medium mb-2">
          <MessageCircle className="w-5 h-5" />
          FAQ
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">How do I track my order?</h4>
            <p className="text-gray-600">You can track your order in the Order Status section.</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">What payment methods do you accept?</h4>
            <p className="text-gray-600">We accept credit cards, debit cards, and wallet payments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPanel;