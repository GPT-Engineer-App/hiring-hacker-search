import React from 'react';
import { useJobListings } from '../contexts/JobListingsContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const SearchFilters = () => {
  const { filters, updateFilters } = useJobListings();

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleRemoteChange = (value) => {
    updateFilters({ remote: value === 'all' ? null : value === 'true' });
  };

  const handleDateChange = (value) => {
    const date = value === 'all' ? null : new Date();
    if (value === 'week') date.setDate(date.getDate() - 7);
    if (value === 'month') date.setMonth(date.getMonth() - 1);
    updateFilters({ date });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search job listings..."
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Label htmlFor="remote">Remote</Label>
          <Select onValueChange={handleRemoteChange} defaultValue="all">
            <SelectTrigger id="remote">
              <SelectValue placeholder="Filter by remote" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">Remote Only</SelectItem>
              <SelectItem value="false">On-site Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-1/2">
          <Label htmlFor="date">Date Posted</Label>
          <Select onValueChange={handleDateChange} defaultValue="all">
            <SelectTrigger id="date">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;