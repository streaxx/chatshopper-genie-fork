import React from 'react';
import { User, MapPin, Mail, Key, ArrowLeft } from 'lucide-react';
import { Separator } from '../ui/separator';

interface SettingsPanelProps {
  onBack?: () => void;
}

const SettingsPanel = ({ onBack }: SettingsPanelProps) => {
  const userDetails = {
    id: "USER123",
    email: "user@example.com",
    addresses: [
      {
        name: "Home",
        street: "123 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105"
      }
    ]
  };

  return (
    <div className="space-y-6">
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </button>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
          <User className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-500">User ID</div>
            <div className="font-medium">{userDetails.id}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white/50 rounded-xl">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">{userDetails.email}</div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="font-medium">Saved Addresses</h3>
        {userDetails.addresses.map((address, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-white/50 rounded-xl">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <div className="font-medium">{address.name}</div>
              <div className="text-sm text-gray-500">
                {address.street}, {address.city}, {address.state} {address.zipCode}
              </div>
            </div>
          </div>
        ))}
        <button className="w-full flex items-center gap-3 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors text-primary">
          <MapPin className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      <Separator />

      <div className="space-y-2">
        <h3 className="font-medium">Security</h3>
        <button className="flex items-center gap-3 w-full p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-colors">
          <Key className="w-5 h-5 text-primary" />
          <div className="text-left">
            <div className="font-medium">Change Password</div>
            <div className="text-sm text-gray-500">Update your account password</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;