
import React, { useState, useRef, useEffect } from 'react';
import { Menu, MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PageData {
  id: string;
  title: string;
  content: string;
}

interface NotionEditorProps {
  pageId: string;
}

const NotionEditor: React.FC<NotionEditorProps> = ({ pageId }) => {
  // Mock data - in a real app, you'd fetch this from a database
  const mockPages: { [key: string]: PageData } = {
    '1': {
      id: '1',
      title: 'Getting Started',
      content: 'Welcome to your Notion clone! This is a simple text editor inspired by Notion.\n\nStart typing to edit this page.'
    },
    '2': {
      id: '2',
      title: 'Tasks',
      content: '# Tasks\n\nThis is your task list. You can use it to keep track of your daily activities.'
    },
    '3': {
      id: '3',
      title: 'Projects',
      content: '# Projects\n\n## Active Projects\n\n- Project Alpha\n- Project Beta\n\n## Completed Projects\n\n- Project Gamma'
    },
    '4': {
      id: '4',
      title: 'Meeting Notes',
      content: '# Meeting Notes\n\n## Team Standup - 2023-05-22\n\n### Attendees\n- Alice\n- Bob\n- Charlie\n\n### Action Items\n- [ ] Review project timeline\n- [ ] Update documentation'
    },
  };

  const [page, setPage] = useState<PageData | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pageId && mockPages[pageId]) {
      const pageData = mockPages[pageId];
      setPage(pageData);
      setTitle(pageData.title);
      setContent(pageData.content);
      
      // Set document title
      document.title = `${pageData.title} | Notion Clone`;
    }
  }, [pageId]);

  useEffect(() => {
    if (contentRef.current) {
      const paragraphs = content.split('\n').map(line => {
        // Convert headers
        if (line.startsWith('# ')) {
          return `<h1>${line.substring(2)}</h1>`;
        } else if (line.startsWith('## ')) {
          return `<h2>${line.substring(3)}</h2>`;
        } else if (line.startsWith('### ')) {
          return `<h3>${line.substring(4)}</h3>`;
        } 
        // Convert list items
        else if (line.startsWith('- ')) {
          return `<ul><li>${line.substring(2)}</li></ul>`;
        } 
        // Convert task items
        else if (line.startsWith('- [ ] ')) {
          return `<div><input type="checkbox"> ${line.substring(6)}</div>`;
        } else if (line.startsWith('- [x] ')) {
          return `<div><input type="checkbox" checked> ${line.substring(6)}</div>`;
        }
        // Default to paragraph
        else if (line.trim() !== '') {
          return `<p>${line}</p>`;
        } else {
          return '<br>';
        }
      }).join('');
      
      contentRef.current.innerHTML = paragraphs;
    }
  }, [content]);

  const handleContentInput = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerText);
    }
  };

  const handleTitleInput = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.innerText);
      // Update document title as well
      document.title = `${titleRef.current.innerText} | Notion Clone`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak', false);
    }
  };

  if (!page) {
    return (
      <div className="notion-editor">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="notion-editor">
      {/* Page header with title */}
      <div className="mb-6">
        <div 
          ref={titleRef}
          contentEditable
          onInput={handleTitleInput}
          onKeyDown={handleKeyDown}
          className="text-3xl font-bold mb-2 outline-none pb-1 notion-block-hover"
          placeholder="Untitled"
          suppressContentEditableWarning={true}
        >
          {title}
        </div>
      </div>

      {/* Add block menu */}
      <div className="flex mb-2 cursor-pointer group">
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
          <Plus className="h-4 w-4 text-notion-icon" />
        </div>
      </div>

      {/* Editable content area */}
      <div 
        ref={contentRef}
        contentEditable
        onInput={handleContentInput}
        className="outline-none min-h-[50vh]"
        suppressContentEditableWarning={true}
      >
        {/* Content will be rendered via useEffect */}
      </div>

      {/* Page menu */}
      <div className="fixed bottom-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-notion-muted hover:bg-notion-hover p-2 rounded-md transition-colors">
              <MoreHorizontal className="h-5 w-5 text-notion-icon" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Add icon</DropdownMenuItem>
            <DropdownMenuItem>Add cover</DropdownMenuItem>
            <DropdownMenuItem>Add comment</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default NotionEditor;
