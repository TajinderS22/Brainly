import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import tagsReducer from './tagsSlice'
import contentReducer from './ContentSlice'
import contentDataStateReducer from './ContentDataStateSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    tags: tagsReducer,
    content:contentReducer,
    contentDataState:contentDataStateReducer
  }
})
export type RootState = ReturnType<typeof store.getState>
