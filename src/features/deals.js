import { createSlice } from '@reduxjs/toolkit';

var axios = require('axios');

export const dealsSlice = createSlice({
    name: "deals",
    initialState: { allDeals: [], deal: [], noDeals: [], filtered: [] },
    reducers: {
        getAllDeals: (state, action) => {
            state.allDeals = [action.payload];
            let noDeals = [];
            state.noDeals.forEach(filterNoDeals);
            function filterNoDeals(deal) {
                if (!deal.isOnSale) {
                    noDeals.push(deal)
                }
            }
            state.noDeals = noDeals;            
        },
        getDeal: (state, action) => {
            state.deal = [action.payload];
        },
        filterDeals: (state, action) => {                
            if (state.allDeals[0]){
                let filtered = [];
                state.allDeals[0].forEach(filterDeals);
                function filterDeals(deal) {
                    let title = deal.title.toLowerCase();                    
                    if (title.includes(action.payload.toLowerCase())) {
                        filtered.push(deal)
                    }
                }
                state.filtered = filtered;
            }                
        }
    }
})

export const { getAllDeals, getDeal, filterDeals } = dealsSlice.actions;

export const getDealAsync = (dealID) => async (dispatch) => {
    try {
        const dealUrl = "https://www.cheapshark.com/api/1.0/deals?id=" + dealID;
        var getDealRequest = {
            method: 'get',
            url: dealUrl,
            headers: {}
        };
        await axios(getDealRequest)
            .then(function (response) {
                dispatch(getDeal(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        throw new Error(err);
    }
}

export const getAllDealsAsync = () => async (dispatch) => {
    try {
        const dealsUrl = "https://www.cheapshark.com/api/1.0/deals";
        var getAllDealsRequest = {
            method: 'get',
            url: dealsUrl,
            headers: {}
        };
        await axios(getAllDealsRequest)
            .then(function (response) {
                dispatch(getAllDeals(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        throw new Error(err);
    }
}

export default dealsSlice.reducer;