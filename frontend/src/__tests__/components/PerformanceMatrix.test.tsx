import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PerformanceMatrix from '../../components/PerformanceMatrix';

// Mock data
const mockBenchmarks = [
  {
    id: 1,
    name: 'GLUE',
    description: 'General Language Understanding Evaluation',
    category: { id: 1, name: 'NLP' },
    scores: [
      {
        id: 1,
        score: 89.3,
        lastUpdated: '2024-01-01',
        model: { id: 1, name: 'GPT-3' }
      }
    ]
  }
];

const mockModels = [
  {
    id: 1,
    name: 'GPT-3',
    type: { id: 1, name: 'Transformer' },
    scores: [
      {
        id: 1,
        score: 89.3,
        lastUpdated: '2024-01-01',
        benchmark: { id: 1, name: 'GLUE' }
      }
    ]
  }
];

// Mock fetch
global.fetch = jest.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(
      url.includes('/benchmarks') ? mockBenchmarks : mockModels
    )
  })
) as jest.Mock;

describe('PerformanceMatrix', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<PerformanceMatrix />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders matrix with data after loading', async () => {
    render(<PerformanceMatrix />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Check if benchmark and model names are rendered
    expect(screen.getByText('GLUE')).toBeInTheDocument();
    expect(screen.getByText('GPT-3')).toBeInTheDocument();

    // Check if score is rendered
    expect(screen.getByText('89.3')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Mock fetch to simulate an error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('API Error'))
    );

    render(<PerformanceMatrix />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('displays empty state when no data is available', async () => {
    // Mock fetch to return empty arrays
    (global.fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      })
    );

    render(<PerformanceMatrix />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // The table should still be rendered but with no data
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByText('GLUE')).not.toBeInTheDocument();
    expect(screen.queryByText('GPT-3')).not.toBeInTheDocument();
  });
});