import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobListings } from '../utils/api';

const JobListingsContext = createContext();

export const useJobListings = () => useContext(JobListingsContext);

export const JobListingsProvider = ({ children }) => {
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    remote: null,
    date: null,
  });

  const { data: jobListings, isLoading, error } = useQuery({
    queryKey: ['jobListings'],
    queryFn: fetchJobListings,
  });

  useEffect(() => {
    if (jobListings) {
      setFilteredListings(applyFilters(jobListings, filters));
    }
  }, [jobListings, filters]);

  const applyFilters = (listings, filters) => {
    return listings.filter(job => {
      const matchesSearch = job.text.toLowerCase().includes(filters.search.toLowerCase());
      const matchesRemote = filters.remote === null || job.remote === filters.remote;
      const matchesDate = filters.date === null || new Date(job.date) >= filters.date;
      return matchesSearch && matchesRemote && matchesDate;
    });
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <JobListingsContext.Provider value={{ filteredListings, filters, updateFilters, isLoading, error }}>
      {children}
    </JobListingsContext.Provider>
  );
};