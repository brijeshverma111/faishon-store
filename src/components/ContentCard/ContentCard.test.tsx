import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ContentCard from './ContentCard';


describe('ContentCard', () => {
  const baseItem = {
    id: '1',
    title: 'Test Item',
    userName: 'Test User',
    userId: 'user1',
    imageUrl: 'https://example.com/image.jpg',
    pricingOption: 'Paid' as 'Paid',
    price: 42,
  };

  it('renders image, title, and user', () => {
    render(<ContentCard content={baseItem} />);
    expect(screen.getByAltText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('shows price for Paid', () => {
    render(<ContentCard content={{ ...baseItem, pricingOption: 'Paid' as 'Paid', price: 42 }} />);
    expect(screen.getByText('$42.00')).toBeInTheDocument();
  });

  it('shows FREE for Free', () => {
    render(<ContentCard content={{ ...baseItem, pricingOption: 'Free' as 'Free', price: undefined }} />);
    expect(screen.getByText('FREE')).toBeInTheDocument();
  });

  it('shows View Only for View Only', () => {
    render(<ContentCard content={{ ...baseItem, pricingOption: 'View Only' as 'View Only', price: undefined }} />);
    expect(screen.getByText('View Only')).toBeInTheDocument();
  });
}); 