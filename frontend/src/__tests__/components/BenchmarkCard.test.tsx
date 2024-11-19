import React from 'react';
import { render, screen } from '@testing-library/react';
import BenchmarkCard from '../../components/BenchmarkCard';

const mockBenchmark = {
  id: 1,
  name: 'GLUE',
  description: 'General Language Understanding Evaluation benchmark',
  category: {
    id: 1,
    name: 'Natural Language Processing'
  },
  linkToPaper: 'https://example.com/paper',
  methodologyOverview: 'Test methodology',
  humanBaseline: 87.5,
  scores: [
    {
      id: 1,
      score: 89.3,
      lastUpdated: '2024-01-01',
      model: {
        id: 1,
        name: 'GPT-3'
      }
    }
  ]
};

describe('BenchmarkCard', () => {
  it('renders benchmark information correctly', () => {
    render(<BenchmarkCard benchmark={mockBenchmark} />);

    // Check if main elements are rendered
    expect(screen.getByText('GLUE')).toBeInTheDocument();
    expect(screen.getByText('Natural Language Processing')).toBeInTheDocument();
    expect(screen.getByText('General Language Understanding Evaluation benchmark')).toBeInTheDocument();
    expect(screen.getByText('87.5')).toBeInTheDocument();

    // Check if the paper link is rendered
    const paperLink = screen.getByText('View Paper →');
    expect(paperLink).toBeInTheDocument();
    expect(paperLink).toHaveAttribute('href', 'https://example.com/paper');

    // Check if model score is rendered
    expect(screen.getByText('GPT-3')).toBeInTheDocument();
    expect(screen.getByText('89.3')).toBeInTheDocument();
  });

  it('handles missing optional fields gracefully', () => {
    const benchmarkWithoutOptionals = {
      ...mockBenchmark,
      linkToPaper: null,
      humanBaseline: null,
      scores: []
    };

    render(<BenchmarkCard benchmark={benchmarkWithoutOptionals} />);

    // Paper link should not be present
    expect(screen.queryByText('View Paper →')).not.toBeInTheDocument();

    // Human baseline should not be present
    expect(screen.queryByText('87.5')).not.toBeInTheDocument();

    // Should show no scores message
    expect(screen.getByText('No scores available')).toBeInTheDocument();
  });
});