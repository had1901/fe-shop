import { combineReducers, configureStore } from "@reduxjs/toolkit";

import navbarReducer from "./navbar/navbarSlice";
import formLoginReducer from "./navbar/formLoginSlice";
import authReducer from "./auth/authSlice";
import productReducer from './product/productSlice';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'product'] // only navigation will be persisted
  }

  const rootReducer = combineReducers({
        navbar: navbarReducer,
        formLogin: formLoginReducer,
        auth: authReducer,
        product: productReducer
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)