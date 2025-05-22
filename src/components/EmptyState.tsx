
import React from 'react';
import { File, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const EmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-notion-muted rounded-lg p-10 max-w-md w-full text-center">
        <File className="h-12 w-12 mx-auto mb-4 text-notion-icon" />
        <h2 className="text-xl font-semibold mb-2">No page selected</h2>
        <p className="text-muted-foreground mb-6">
          Select an existing page from the sidebar or create a new one to get started
        </p>
        <Button onClick={() => navigate('/page/1')}>
          <Plus className="h-4 w-4 mr-2" />
          Create a page
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
