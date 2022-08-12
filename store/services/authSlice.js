import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const getInitialData = () => {
    try {
        return {
            ...JSON.parse(localStorage.getItem('authData')), filterInfo: {}
        }
    } catch (e) {
        return {
            user: null,
            token: null,
            filterInfo: {}
        }
    }
}
const initialState = getInitialData()
export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        // 👇 Logout the user by returning the initial state
        logout: () => {
            localStorage.removeItem('authData')
            return initialState
        },
        // Save the user's info
        setUserInfo: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            localStorage.setItem('authData', JSON.stringify(action.payload))
        },
        // Save the user's info
        setFilterInfo: (state, action) => {
            state.filterInfo = action.payload;
        },
    },
});

export const {logout, setUserInfo, setFilterInfo} = authSlice.actions;
// 👇 Export the authSlice.reducer to be included in the store.
export default authSlice.reducer;

