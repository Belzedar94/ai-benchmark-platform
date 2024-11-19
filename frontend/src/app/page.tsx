'use client';

import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import PerformanceMatrix from '../components/PerformanceMatrix';

export default function Home() {
  const [filters, setFilters] = useState({
    category: undefined,
    modelType: undefined,
    searchQuery: ''
  });

  const handleFilterChange = (newFilters: {
    category?: number;
    modelType?: number;
    searchQuery: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            AI Benchmark Platform
          </h1>
          
          <div className="mb-8">
            <FilterBar onFilterChange={handleFilterChange} />
          </div>

          <div className="bg-white shadow rounded-lg">
            <PerformanceMatrix />
          </div>
        </div>
      </div>
    </main>
  );
}
