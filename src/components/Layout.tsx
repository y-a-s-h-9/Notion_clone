
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-notion">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div 
        className={cn(
          "flex-1 transition-all duration-200 ease-in-out", 
          sidebarCollapsed ? "ml-[60px]" : "ml-[250px]"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
