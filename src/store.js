// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { storesReducer, dealsReducer, gameReducer } from './features';

const store = configureStore({
    reducer: {
        stores: storesReducer,
        deals: dealsReducer,
        game: gameReducer,
    },
});

setupListeners(store.dispatch);

export default store