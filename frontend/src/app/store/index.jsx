import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './slice/orderSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware()
const Store = configureStore({
  reducer:{
    order: orderSlice,
  },
  middleware: [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
export default Store;