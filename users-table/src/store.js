// store.js

import { configureStore } from '@reduxjs/toolkit';
import recordReducer from './reducers/recordReducers.js';

const store = configureStore({
  reducer: {
    records: recordReducer,
  },
});

export default store;
