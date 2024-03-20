import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modeReducer from 'store/slices/modeSlice'
import authReducer from 'store/slices/authSlice'
import userReducer from 'store/slices/userSlice'
import postsReducer from 'store/slices/postsSlice'
import searchReducer from 'store/slices/searchSlice'
import { useAppDispatch, useAppSelector } from 'store/reduxHooks'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  mode: modeReducer,
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
  search: searchReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { useAppDispatch, useAppSelector }
