import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './slice/orderSlice';

const Store = configureStore({
  reducer:{
    order: orderSlice,
  },
})
export default Store;