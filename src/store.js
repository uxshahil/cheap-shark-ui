// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
    },
});

setupListeners(store.dispatch);

export default store