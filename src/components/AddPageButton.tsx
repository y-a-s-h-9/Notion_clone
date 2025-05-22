
import React from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const AddPageButton: React.FC = () => {
  const [title, setTitle] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleCreatePage = () => {
    // In a real app, you'd create a new page in the database
    // and then navigate to it
    
    // For now, we'll just generate a random ID and navigate
    const randomId = Math.random().toString(36).substring(7);
    setOpen(false);
    navigate(`/page/${randomId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start px-2 text-sm">
          <Plus className="h-4 w-4 mr-2" />
          New page
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new page</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Page title</Label>
            <Input 
              id="title" 
              placeholder="Untitled" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreatePage}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPageButton;
