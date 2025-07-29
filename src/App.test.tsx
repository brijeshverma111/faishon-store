// src/App.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

// Mock the thunk
jest.mock('./features/contents/contentsThunks', () => ({
  fetchContentsThunk: jest.fn(() => ({ type: 'MOCK_FETCH' })),
}));

const middlewares: any = [];
const mockStore = configureStore(middlewares);

it('renders main sections and filter/search/sort UI', () => {
  const store = mockStore({
    contents: {
      items: [],
      status: 'idle',
      error: null,
      filters: [],
      search: '',
      page: 1,
      hasMore: true,
      sorting: 'name',
      priceRange: [0, 999],
    },
  });

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText('CONECT')).toBeTruthy();
  expect(screen.getByPlaceholderText('Keyword search')).toBeTruthy();
  expect(screen.getByText('RESET')).toBeTruthy();
  expect(screen.getByLabelText(/Sort By/i)).toBeTruthy();
  expect(screen.getByText('Price Range:')).toBeTruthy();
});