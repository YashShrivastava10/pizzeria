import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './slice/orderSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';
import buildSlice from './slice/buildSlice';
import cartSlice from './slice/cartSlice';

const sagaMiddleware = createSagaMiddleware()
const Store = configureStore({
  reducer:{
    order: orderSlice,
    build: buildSlice,
    cart: cartSlice,
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
export default Store;