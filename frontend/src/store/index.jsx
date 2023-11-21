import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import orderSlice from './slice/orderSlice';
import buildSlice from './slice/buildSlice';
import cartSlice from './slice/cartSlice';
import userSlice from './slice/userSlice';
import rootSaga from '@/saga/rootSaga';
import loadingSlice from './slice/loadingSlice';

const sagaMiddleware = createSagaMiddleware()
const Store = configureStore({
  reducer:{
    order: orderSlice,
    build: buildSlice,
    cart: cartSlice,
    user: userSlice,
    loading: loadingSlice,
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
export default Store;