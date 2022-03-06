import { createSlice } from '@reduxjs/toolkit';

var axios = require('axios');

export const storesSlice = createSlice({
    name: "stores",
    initialState: {
        data: {
            allStores: {},
            storeName: '',
            filteredStores: {}
        },
        loading: true,
        filtering: false,
        error: false,
        inputData: {},        
    },
    reducers: {
        getAllStoresLoading: (state) => {
            state.loading = true;
            state.error = false;
            // console.log('getAllStoresLoading')
        },
        getAllStoresSuccess: (state, action) => {
            state.data.allStores = action.payload;
            state.loading = false;
            state.error = false;
            // console.log('getAllStoresSuccess')
        },
        getAllStoresFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // console.log('getAllStoresFailure')
        },
        getStoreName: (state, action) => {
            state.filtering = true;
            try {
                state.data.storeName = state.data.allStores
                    .find(x => x.storeID === action.payload).storeName
                state.filtering = false;
                state.error = false
            } catch (e) {
                state.filtering = false;
                state.error = true
            }
        },
        filterStoresLoading: (state) => {
            state.filtering = true;
            state.error = false;
            // console.log('filterStoresLoading')
        },
        filterStoresSuccess: (state, action) => {
            state.data.filteredStores = action.payload;
            state.filtering = false;
            state.error = false;
            // console.log('filterStoresSuccess')
            // console.log(current(state.data));
        },
        filterStoresFailure: (state, action) => {
            state.filtering = false;
            state.error = action.payload;
            // console.log('filterStoresFailure')
        },
    },
})

export const { getAllStoresLoading, getAllStoresSuccess, getAllStoresFailure, getStoreName,
    filterStoresLoading, filterStoresSuccess, filterStoresFailure } = storesSlice.actions;

export const getAllStoresAsync = () => async (dispatch) => {
    try {

        dispatch(getAllStoresLoading());

        const storeUrl = "https://www.cheapshark.com/api/1.0/stores";
        var getAllStoresRequest = {
            method: 'get',
            url: storeUrl,
            headers: {}
        };
        await axios(getAllStoresRequest)
            .then(function (response) {
                dispatch(getAllStoresSuccess(response.data));
                return response.data;
            })
    } catch (err) {
        dispatch(getAllStoresFailure(err));
        throw new Error(err);
    }
}

export const filterStoresAsync = (stores, storesFilter) => async (dispatch) => {
    try {    
        dispatch(filterStoresLoading({ stores: stores, storesFilter: storesFilter }))

        function filterByKeyword(stores) {
        
            if (storesFilter !== '') {
                let filtered = [];                            
                stores.forEach(filterStores);

                function filterStores(store) {
                    let title = store.storeName.toLowerCase();
                    if (title.includes(storesFilter.toLowerCase())) {
                        filtered.push(store)
                    }
                }            
                return filtered;
            } else {
                return stores;
            }
        }

        dispatch(filterStoresSuccess(await filterByKeyword(stores)))

    } catch (err) {
        dispatch(filterStoresFailure(err))
    }
}

export default storesSlice.reducer;