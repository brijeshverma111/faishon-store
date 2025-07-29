import type { RootState } from '../../store';
import type { ContentItem } from '../../types/content';
import { createSelector } from '@reduxjs/toolkit';

// Basic selectors to extract relevant slices of state
export const selectContents = (state: RootState) => state.contents.items;
export const selectFilters = (state: RootState) => state.contents.filters;
export const selectSearch = (state: RootState) => state.contents.search;
export const selectStatus = (state: RootState) => state.contents.status;
export const selectError = (state: RootState) => state.contents.error;
export const selectSorting = (state: RootState) => state.contents.sorting;
export const selectPriceRange = (state: RootState) => state.contents.priceRange;

export const selectFilteredContents = createSelector(
  [selectContents, selectFilters, selectSearch, selectSorting, selectPriceRange],
  (items, filters, search, sorting, priceRange): ContentItem[] => {
    // Convert search term to lowercase once
    const lowerCaseSearch = search.toLowerCase();

    // Start with a shallow copy of items to avoid mutating the original state array
    let filtered = [...items];

    // 1. Apply Filters
    if (filters && filters.length > 0) {
      filtered = filtered.filter((item) =>
        filters.includes(item.pricingOption)
      );
    }

    // 2. Apply Search
    if (lowerCaseSearch) { // Only apply if search term is not empty
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(lowerCaseSearch) ||
        item.userName.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (priceRange && priceRange.length === 2) {
      const [minPrice, maxPrice] = priceRange;
      filtered = filtered.filter((item) => {
        const itemPrice = item.price !== undefined ? item.price : 0; // Ensure price is a number
        return item.pricingOption !== 'Paid' || (itemPrice >= minPrice && itemPrice <= maxPrice);
      });
    }

    if (sorting === 'name') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sorting === 'priceHigh') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sorting === 'priceLow') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    return filtered; 
  }
);