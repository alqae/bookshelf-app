import { configureStore, combineReducers, MiddlewareAPI, Middleware, isRejectedWithValue } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { api } from '@services/api'

import authReducer from './reducers/auth.reducer'
import sharedReducer, { addToast } from './reducers/shared.reducer'

const reducer = combineReducers({
  auth: authReducer,
  shared: sharedReducer,
  [api.reducerPath]: api.reducer,
})

export const httpErrorInterceptor: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!', api)
    api.dispatch(
      addToast({
        variant: 'danger',
        text: action.payload.error,
        position: 'bottomCenter'
      })
    )
  }

  return next(action)
}

const middleware = [
  thunk,
  ...(
    import.meta.env.NODE_ENV !== 'production' ?
      [
        /* Development middleware */
        logger,
      ] : [
        /* Production middleware */
      ]
  ),
  api.middleware,
  httpErrorInterceptor,
]

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: import.meta.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
