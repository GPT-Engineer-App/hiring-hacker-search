import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const JobCard = ({ job }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{job.company}</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {job.remote && <Badge variant="secondary">Remote</Badge>}
          <Badge variant="outline">{new Date(job.date).toLocaleDateString()}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{job.text}</p>
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          View on Hacker News
        </a>
      </CardContent>
    </Card>
  );
};

export default JobCard;