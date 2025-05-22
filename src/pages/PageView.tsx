
import React from 'react';
import { useParams } from 'react-router-dom';
import NotionEditor from '@/components/NotionEditor';

const PageView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div className="p-6">Page not found</div>;
  }

  return <NotionEditor pageId={id} />;
};

export default PageView;
