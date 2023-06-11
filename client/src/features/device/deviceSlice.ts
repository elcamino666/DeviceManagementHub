import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Device } from '../../models/DeviceModel.ts';
import Router from '../../Router/Router.ts';
import Axios from 'axios';

export const fetchDevices = createAsyncThunk('devices', async () => {
    try {
        const res = await Axios.get(Router.getDevices);
        return res.data;
    } catch (e) {
        console.error(e);
    }
});

// Define a type for the slice state
interface DeviceState {
    devices: Device[];
    loading: boolean;
    error: string | null | undefined;
}

// Define the initial state using that type
const initialState: DeviceState = {
    devices: [],
    loading: false,
    error: null,
};

export const counterSlice = createSlice({
    name: 'device',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addDevice: (state, action: PayloadAction<Device>) => {
            state.devices.push(action.payload);
        },
        deleteDeviceById: (state, action: PayloadAction<number | undefined>) => {
            if (!action.payload) return;
            state.devices = state.devices.filter((device) => device.id !== action.payload);
        },
        updateDevice: (state, action: PayloadAction<Device>) => {
            const index = state.devices.findIndex((device) => device.id === action.payload.id);
            if (index === -1) {
                console.error('Device not found: ', action.payload.id);
                return;
            }
            state.devices[index] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDevices.fulfilled, (state, action) => {
            state.devices = action.payload;
        });
        builder.addCase(fetchDevices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDevices.rejected, (state, action) => {
            state.error = action.error.message;
        });
    },
});

export const { addDevice, deleteDeviceById, updateDevice } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDevices = (state: RootState) => state.device.devices;

export default counterSlice.reducer;
