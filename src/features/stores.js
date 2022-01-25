import { createSlice } from '@reduxjs/toolkit';
const storeUrl = "https://www.cheapshark.com/api/1.0/stores?id=";
var axios = require('axios');
var getStoresRequest = {
    method: 'get',
    url: storeUrl,
    headers: {}
};

let initialStateValue;

axios(getStoresRequest)
    .then(function (response) {
        console.log((response.data));
        initialStateValue = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

export const storesSlice = createSlice({
    name: "stores",
    initialState: { value: initialStateValue },
    reducers: {
        getStoreName: (state, action) => {            
            state.value = initialStateValue.find(
                x => x.storeID === action.payload
            ).storeName;            
        },
    }
})

export const { getStoreName } = storesSlice.actions;

export default storesSlice.reducer;