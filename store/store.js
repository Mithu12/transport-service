import {configureStore} from '@reduxjs/toolkit'
import {userApi} from "./services/userApi";
import authReducer from "./services/authSlice";
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        userInfo: authReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    // middleware : getDefaultMiddleware => getDefaultMiddleware().concat(middleWareToAdd)
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware)
});

setupListeners(store.dispatch)
