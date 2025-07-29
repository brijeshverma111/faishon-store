import { combineReducers } from '@reduxjs/toolkit';
import contentsReducer from '../features/contents/contentsSlice';

const rootReducer = combineReducers({
  contents: contentsReducer,
});

export default rootReducer;
