import rootReducer from "./app/reducer";
import { configureStore } from "@reduxjs/toolkit";
import virtualCustumer from "./web/cart-slice";
import userSlice from "./web/user-slice";

const store = configureStore({
  reducer: {
    admin: rootReducer,
    user: userSlice,
    virtualCustumer: virtualCustumer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export {
  store
};