import heroes from '../reducers/heroes'
import filters from '../reducers/filters'
import { configureStore } from '@reduxjs/toolkit'

const stringMiddleware = () => (next) => (action) => action.typeof === 'string'
  ? next({
    type: action
  })
  : next(action)

const store = configureStore({
  reducer: { heroes, filters },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
