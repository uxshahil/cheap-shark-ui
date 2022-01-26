import { createSlice } from '@reduxjs/toolkit';

var axios = require('axios');

export const gameSlice = createSlice({
    name: "game",
    initialState: { game: [] },
    reducers: {
        getGame: (state, action) => {
            state.game = [action.payload];
        }
    }
})

export const { getGame } = gameSlice.actions;

export const getGameAsync = (gameID) => async (dispatch) => {
    try {
        const gameUrl = "https://www.cheapshark.com/api/1.0/games?id=" + gameID;
        var getGameRequest = {
            method: 'get',
            url: gameUrl,
            headers: {}
        };
        await axios(getGameRequest)
            .then(function (response) {                
                dispatch(getGame(response.data));                
            })
            .catch(function (error) {
                console.log(error);
            });

    } catch (err) {
        throw new Error(err);
    }
}

export default gameSlice.reducer;