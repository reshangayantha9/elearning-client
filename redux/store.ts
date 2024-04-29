'use client'
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice }from "./features/api/apiSlice"
import authSlice from "@/redux/features/auth/authSlice";
// Add authentication middleware
const authMiddleware = (store:any) => (next:any) => async (action:any) => {
    if (action.type === apiSlice.endpoints.loadUser.initiate.toString()) {
      // Dispatch token refresh action before loading user data
      await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }));
    }
    return next(action);
  };
export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authSlice,
    },
    devTools:false,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware,authMiddleware)
})

//call the refresh token function on every page load
const initializeApp=async()=>{
    // await store.dispatch(apiSlice.endpoints.refreshToken.initiate({},{forceRefetch:true}));
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({},{forceRefetch:true}));
}

initializeApp();