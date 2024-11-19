import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '../../components/FilterBar';

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      categories: [
        { id: 1, name: 'NLP' },
        { id: 2, name: 'Computer Vision' }
      ],
      modelTypes: [
        { id: 1, name: 'Transformer' },
        { id: 2, name: 'CNN' }
      ]
    })
  })
) as jest.Mock;

describe('FilterBar', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders filter inputs correctly', async () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    // Check if main elements are rendered
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Model Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();

    // Wait for options to be loaded
    await waitFor(() => {
      expect(screen.getByText('NLP')).toBeInTheDocument();
      expect(screen.getByText('Computer Vision')).toBeInTheDocument();
      expect(screen.getByText('Transformer')).toBeInTheDocument();
      expect(screen.getByText('CNN')).toBeInTheDocument();
    });
  });

  it('calls onFilterChange when filters are updated', async () => {
    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    // Wait for options to be loaded
    await waitFor(() => {
      expect(screen.getByText('NLP')).toBeInTheDocument();
    });

    // Select a category
    const categorySelect = screen.getByLabelText('Category');
    fireEvent.change(categorySelect, { target: { value: '1' } });

    // Select a model type
    const modelTypeSelect = screen.getByLabelText('Model Type');
    fireEvent.change(modelTypeSelect, { target: { value: '1' } });

    // Enter search text
    const searchInput = screen.getByLabelText('Search');
    await userEvent.type(searchInput, 'test');

    // Verify onFilterChange was called with correct parameters
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      category: 1,
      modelType: 1,
      searchQuery: 'test'
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock fetch to simulate an error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    render(<FilterBar onFilterChange={mockOnFilterChange} />);

    // Should still render the basic structure
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Model Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Search')).toBeInTheDocument();

    // Error should be logged (you might want to show an error message to the user)
    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});