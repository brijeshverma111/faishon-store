import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ContentItem, PricingOption } from '../../types/content';
import { fetchContentsThunk } from './contentsThunks';

type Sorting = 'name' | 'priceHigh' | 'priceLow';

interface ContentsState {
  items: ContentItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: PricingOption[];
  search: string;
  page: number;
  hasMore: boolean;
  sorting: Sorting;
  priceRange: [number, number];
}

const initialState: ContentsState = {
  items: [],
  status: 'idle',
  error: null,
  filters: [],
  search: '',
  page: 1,
  hasMore: true,
  sorting: 'name',
  priceRange: [0, 999],
};

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<PricingOption[]>) {
      state.filters = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    resetFilters(state) {
      state.filters = [];
      state.search = '';
      state.priceRange = [0, 999];
      state.sorting = 'name';
    },
    setSorting(state, action: PayloadAction<Sorting>) {
      state.sorting = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    // Add more reducers as needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchContentsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchContentsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Unknown error';
      });
  },
});

export const { setFilters, setSearch, resetFilters, setSorting, setPriceRange } = contentsSlice.actions;
export default contentsSlice.reducer;
