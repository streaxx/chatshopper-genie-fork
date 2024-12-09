import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  isUser?: boolean;
  children: React.ReactNode;
}

const ChatMessage = ({ isUser = false, children }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-4",
          isUser
            ? "bg-primary/10 text-primary-foreground"
            : "bg-white/80 backdrop-blur-sm border border-white/50"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatMessage;