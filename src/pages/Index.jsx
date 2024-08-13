import React from 'react';
import JobListings from '../components/JobListings';
import { JobListingsProvider } from '../contexts/JobListingsContext';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Hacker News Who's Hiring</h1>
        <JobListingsProvider>
          <JobListings />
        </JobListingsProvider>
      </div>
    </div>
  );
};

export default Index;