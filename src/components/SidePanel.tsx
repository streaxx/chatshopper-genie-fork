import React from 'react';
import { Maximize2, X } from 'lucide-react';
import { Sheet, SheetContent } from './ui/sheet';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const SidePanel = ({ isOpen, onClose, title, children }: SidePanelProps) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        className={`${isFullScreen ? 'w-screen !max-w-none' : 'w-[400px]'} p-0 transition-all duration-300`}
        side="right"
      >
        <div className="flex flex-col h-full bg-white">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidePanel;