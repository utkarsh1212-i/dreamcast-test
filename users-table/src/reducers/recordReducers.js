// reducers/recordReducer.js

import { createReducer } from '@reduxjs/toolkit';
import { fetchRecords, addRecord, deleteRecord, updateRecord } from '../actions/recordActions';

const initialState = {
    records: [],
    loading: false,
    error: null,
};

const recordReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchRecords.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRecords.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
        })
        .addCase(fetchRecords.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(addRecord.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addRecord.fulfilled, (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        })
        .addCase(addRecord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(deleteRecord.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteRecord.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((record) => record.id !== action.payload);
        })
        .addCase(deleteRecord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        .addCase(updateRecord.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateRecord.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload)
            const updatedRecordIndex = state.records.findIndex(record => record.id === action.payload.id);
            if (updatedRecordIndex !== -1) {
                state.records[updatedRecordIndex] = action.payload;
            }
        })
        .addCase(updateRecord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
});

export default recordReducer;
