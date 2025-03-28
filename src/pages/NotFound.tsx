
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center h-[70vh]">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
