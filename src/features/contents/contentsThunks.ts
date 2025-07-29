import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContents } from '../../api/contentsApi';
import type { ContentItem } from '../../types/content';

export const fetchContentsThunk = createAsyncThunk<ContentItem[]>(
  'contents/fetchContents',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchContents();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch contents');
    }
  }
);
