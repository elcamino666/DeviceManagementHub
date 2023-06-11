import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import deviceReducer from '../features/device/deviceSlice.ts'

export const store = configureStore({
    reducer: {
        device: deviceReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
