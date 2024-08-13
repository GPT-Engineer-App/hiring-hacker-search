import React from 'react';
import { useJobListings } from '../contexts/JobListingsContext';
import JobCard from './JobCard';
import SearchFilters from './SearchFilters';

const JobListings = () => {
  const { filteredListings, isLoading, error } = useJobListings();

  if (isLoading) return <div className="text-center text-2xl mt-8">Loading job listings...</div>;
  if (error) return <div className="text-center text-2xl mt-8 text-red-600">Error loading job listings</div>;

  return (
    <div>
      <SearchFilters />
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
      {filteredListings.length === 0 && (
        <div className="text-center text-xl mt-8 text-gray-600">No job listings found matching your criteria.</div>
      )}
    </div>
  );
};

export default JobListings;