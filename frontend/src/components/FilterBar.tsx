import React, { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface ModelType {
  id: number;
  name: string;
}

interface FilterBarProps {
  onFilterChange: (filters: {
    category?: number;
    modelType?: number;
    searchQuery: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modelTypes, setModelTypes] = useState<ModelType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [selectedModelType, setSelectedModelType] = useState<number>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, modelTypesRes] = await Promise.all([
          fetch('http://localhost:3001/api/categories'),
          fetch('http://localhost:3001/api/model-types')
        ]);

        if (categoriesRes.ok && modelTypesRes.ok) {
          const categoriesData = await categoriesRes.json();
          const modelTypesData = await modelTypesRes.json();
          setCategories(categoriesData);
          setModelTypes(modelTypesData);
        }
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      modelType: selectedModelType,
      searchQuery
    });
  }, [selectedCategory, selectedModelType, searchQuery, onFilterChange]);

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 p-4 bg-white shadow rounded-lg">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedCategory || ''}
          onChange={(e) =>
            setSelectedCategory(
              e.target.value ? parseInt(e.target.value) : undefined
            )
          }
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Model Type
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={selectedModelType || ''}
          onChange={(e) =>
            setSelectedModelType(
              e.target.value ? parseInt(e.target.value) : undefined
            )
          }
        >
          <option value="">All Types</option>
          {modelTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">Search</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Search benchmarks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilterBar;