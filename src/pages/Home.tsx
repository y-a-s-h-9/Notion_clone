
import React from 'react';
import Layout from '@/components/Layout';
import PageView from './PageView';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Layout>
      <PageView />
    </Layout>
  );
};

export default Home;
