
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, File, Menu, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  
  // Mock data for sidebar pages
  const pages = [
    { id: '1', title: 'Getting Started', icon: 'file' },
    { id: '2', title: 'Tasks', icon: 'file' },
    { id: '3', title: 'Projects', icon: 'file' },
    { id: '4', title: 'Meeting Notes', icon: 'file' },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-notion border-r border-notion-border overflow-hidden transition-all duration-200 ease-in-out",
      collapsed ? "w-[60px]" : "w-[250px]"
    )}>
      <div className="flex items-center border-b border-notion-border h-[45px]">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="h-full rounded-none"
        >
          <Menu className="h-4 w-4 text-notion-icon" />
        </Button>
        
        {!collapsed && (
          <div className="flex-1 px-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm truncate">Notion Clone</span>
              <Button variant="ghost" size="icon" className="h-5 w-5">
                <ChevronDown className="h-3 w-3 text-notion-icon" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Search bar */}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="flex items-center bg-notion-muted rounded-md px-2 py-1.5">
            <Search className="h-3 w-3 text-notion-icon mr-2" />
            <span className="text-sm text-notion-icon">Search...</span>
          </div>
        </div>
      )}

      {/* Pages section */}
      <div className="py-2">
        {!collapsed && (
          <div className="flex items-center justify-between px-3 py-1">
            <div className="flex items-center">
              <ChevronDown className="h-3 w-3 text-notion-icon mr-1" />
              <span className="text-xs uppercase font-medium text-notion-icon">Pages</span>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Plus className="h-3 w-3 text-notion-icon" />
            </Button>
          </div>
        )}

        <div className="mt-1">
          {pages.map((page) => (
            <div 
              key={page.id} 
              className="notion-sidebar-item flex items-center mx-1 group"
              onClick={() => navigate(`/page/${page.id}`)}
            >
              <div className="notion-page-icon">
                <File className="h-4 w-4" />
              </div>
              {!collapsed && (
                <span className="ml-2 truncate">{page.title}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add new page button (when collapsed) */}
      {collapsed && (
        <div className="px-3 mt-2">
          <Button variant="ghost" size="icon" className="w-full h-7">
            <Plus className="h-4 w-4 text-notion-icon" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
