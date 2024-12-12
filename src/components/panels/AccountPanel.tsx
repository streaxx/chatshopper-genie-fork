import React from 'react';
import { User, Wallet, Settings, LogOut } from 'lucide-react';
import SettingsPanel from './SettingsPanel';

interface AccountPanelProps {
  onWalletClick: () => void;
}

const AccountPanel = ({ onWalletClick }: AccountPanelProps) => {
  const [showSettings, setShowSettings] = React.useState(false);

  const userProfile = {
    email: 'user@example.com',
    walletAddress: '0x1234...5678',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  };

  if (showSettings) {
    return <SettingsPanel onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-white/50 rounded-xl backdrop-blur-sm">
        <img
          src={userProfile.profilePicture}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-white/50"
        />
        <div>
          <h3 className="font-medium">{userProfile.email}</h3>
          <p className="text-sm text-gray-500">{userProfile.walletAddress}</p>
        </div>
      </div>

      <div className="space-y-2">
        <button 
          onClick={onWalletClick}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
        >
          <Wallet className="w-5 h-5" />
          <span>Wallet</span>
        </button>
        <button 
          onClick={() => setShowSettings(true)}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors text-red-500">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AccountPanel;