import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './slices/counter.js'
export const store = configureStore(
    {
        reducer: {
            counter: counterSlice,
        }
    }
    // now this store is storing the reducers and slices and i can use and update 
    // this store 
    // values in any components in global context through useSelector and 
    // useDispatch and i don't neet to do props drilling that is very difficult 
    // and messy that is what redux solved
)