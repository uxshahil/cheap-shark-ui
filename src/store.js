// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { storesReducer } from './features';

const store = configureStore({
    reducer: {
        stores: storesReducer
    },
});

setupListeners(store.dispatch);

export default store