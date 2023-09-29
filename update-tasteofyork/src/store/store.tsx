import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import mapButtonReducer from './mapButtonSlice';
import mealReducer from './mealSlice';
import fileReducer from './fileSlice'
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
      mapButton: mapButtonReducer,
      meal: mealReducer,
      file:fileReducer,
      user: userReducer
    },
});

export default store

export type RootState = ReturnType<typeof store.getState>;