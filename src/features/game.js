import { createSlice } from '@reduxjs/toolkit';

var axios = require('axios');

export const gameSlice = createSlice({
    name: "game",
    initialState: { 
        data: {},
        loading: true,    
        error: false,
        inputData: {}
    },
    reducers: {
        getGameLoading: (state, action) => {
            state.inputData = action.payload;
            state.loading = true;
            state.error = false;
            // console.log('getGameLoading')
        },
        getGameSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = false;
            // console.log('getGameSuccess')
        },
        getGameFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            // console.log('getGameFailure')
        },
    }
})

export const { getGameLoading, getGameSuccess, getGameFailure } = gameSlice.actions;

export const getGameAsync = (gameID) => async (dispatch) => {
    try {
        dispatch(getGameLoading(gameID));
        const gameUrl = "https://www.cheapshark.com/api/1.0/games?id=" + gameID;
        var getGameRequest = {
            method: 'get',
            url: gameUrl,
            headers: {}
        };
        await axios(getGameRequest)
            .then(function (response) {                
                dispatch(getGameSuccess(response.data));                
            })
    } catch (err) {
        dispatch(getGameFailure(err));
        throw new Error(err);
    }
}

export default gameSlice.reducer;