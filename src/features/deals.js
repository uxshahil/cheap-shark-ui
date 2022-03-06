import { createSlice } from '@reduxjs/toolkit';

var axios = require('axios');

const initialState = {
    data: {
        allDeals: {},
        deal: {},
        filteredDeals: {},
    },
    loading: {
        allDeals: true,
        deal: true,
    },    
    filtering: false,
    error: false,
    inputData: {}
};

export const dealsSlice = createSlice({
    name: "deals",
    initialState: initialState,
    reducers: {
        getAllDealsLoading: (state) => {
            state.loading.allDeals = true;
            state.error = false;
            // console.log('getAllDealsLoading')
        },
        getAllDealsSuccess: (state, action) => {
            state.data.allDeals = action.payload;
            state.loading.allDeals = false;
            state.error = false;
            // console.log('getAllDealsSuccess')
        },
        getAllDealsFailure: (state, action) => {
            state.loading.allDeals = false;
            state.error = action.payload;
            // console.log('getAllDealsFailure')
        },
        filterDealsLoading: (state) => {
            state.filtering = true;
            state.error = false;
            // console.log('filterDealsLoading')
        },
        filterDealsSuccess: (state, action) => {
            state.data.filteredDeals = action.payload;
            state.filtering = false;
            state.error = false;
            // console.log('filterDealsSuccess')
            // console.log(current(state.data));
        },
        filterDealsFailure: (state, action) => {
            state.filtering = false;
            state.error = action.payload;
            // console.log('filterDealsFailure')
        },
        getDealLoading: (state, action) => {
            state.inputData = action.payload;
            state.loading.deal = true;
            state.error = false;
            // console.log('getDealLoading')
        },
        getDealSuccess: (state, action) => {
            state.data.deal = action.payload;
            state.loading.deal = false;
            state.error = false;
            // console.log('getDealSuccess')
        },
        getDealFailure: (state, action) => {
            state.loading.deal = false;
            state.error = action.payload;
            // console.log('getDealFailure')
        },
    }
})

export const {
    getAllDealsLoading, getAllDealsSuccess, getAllDealsFailure,
    filterDealsLoading, filterDealsSuccess, filterDealsFailure,
    getDealLoading, getDealSuccess, getDealFailure } = dealsSlice.actions;

export const getDealAsync = (dealID) => async (dispatch) => {
    try {

        dispatch(getDealLoading(dealID));

        const dealUrl = "https://www.cheapshark.com/api/1.0/deals?id=" + dealID;
        var getDealRequest = {
            method: 'get',
            url: dealUrl,
            headers: {}
        };
        await axios(getDealRequest)
            .then(function (response) {
                dispatch(getDealSuccess(response.data));
            })
    } catch (err) {
        dispatch(getDealFailure(err));
        throw new Error(err);
    }
}

export const getAllDealsAsync = () => dispatch => {
    try {
        const dealsUrl = "https://www.cheapshark.com/api/1.0/deals";
        var getAllDealsRequest = {
            method: 'get',
            url: dealsUrl,
            headers: {}
        };

        dispatch(getAllDealsLoading(getAllDealsRequest))

        axios(getAllDealsRequest)
            .then(function (response) {            
                dispatch(getAllDealsSuccess(response.data));
            })
        
    } catch (err) {
        dispatch(getAllDealsFailure(err));
        throw new Error(err);
    }
}

export const filterDealsAsync = (deals, dealsFilter, dealsOnly) => async (dispatch) => {
    try {
        
        dispatch(filterDealsLoading({ deals: deals, dealsFilter: dealsFilter, dealsOnly: dealsOnly }))

        async function filterByKeyword(deals) {
            // console.log(dealsFilter)
            if (dealsFilter !== '') {
                let filtered = [];
                // console.log(deals)
                deals.forEach(filterDeals);
                function filterDeals(deal) {
                    let title = deal.title.toLowerCase();
                    if (title.includes(dealsFilter.toLowerCase())) {
                        filtered.push(deal)
                    }
                }
                // console.log(filtered)
                return filtered;
            } else {
                return deals;
            }
        }

        async function filterByDealsOnly(deals) {
            if (dealsOnly === false) {
                let filterDeals = [];

                deals.forEach(filterDealsOnly);

                function filterDealsOnly(deal) {
                    if (!deal.isOnSale) filterDeals.push(deal)
                }
                return filterDeals;
            } else {
                return deals;
            }
        }

        const filteredDeals = await filterByKeyword(deals)
            .then((filteredByKeywordDeals) => {
                if (filteredByKeywordDeals.length) {
                    return filterByDealsOnly(filteredByKeywordDeals)
                }
                else {
                    return filteredByKeywordDeals
                }
            })

        dispatch(filterDealsSuccess(filteredDeals))

    } catch (err) {
        dispatch(filterDealsFailure(err))
    }
}

export default dealsSlice.reducer;