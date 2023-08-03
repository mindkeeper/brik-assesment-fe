import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/authSlice";
import { authQuery } from "./reducers/authQuery";
import { productQuery } from "./reducers/productQuery";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
import { categoryQuery } from "./reducers/categoryQuery";
import { userQuery } from "./reducers/userQuery";
const persistConfig = {
  storage,
  key: "root",
};

const reducer = combineReducers({
  auth: authSlice,
  [authQuery.reducerPath]: authQuery.reducer,
  [productQuery.reducerPath]: productQuery.reducer,
  [categoryQuery.reducerPath]: categoryQuery.reducer,
  [userQuery.reducerPath]: userQuery.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authQuery.middleware)
      .concat(productQuery.middleware)
      .concat(categoryQuery.middleware)
      .concat(userQuery.middleware),
});

export const persistor = persistStore(store);
