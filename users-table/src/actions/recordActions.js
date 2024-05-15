

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecords = createAsyncThunk(
  'records/fetchRecords',
  async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  }
);

export const addRecord = createAsyncThunk(
  'records/addRecord',
  async (recordData) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', recordData);
    return response.data;
  }
);

export const deleteRecord = createAsyncThunk(
  'records/deleteRecord',
  async (recordId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${recordId}`);
    return recordId;
  }
);

export const updateRecord = createAsyncThunk(
    'records/updateRecord',
    async (recordData) => {
        const { id, ...rest } = recordData;
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, rest);
        return response.data;
    }
);

