import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { useEffect, useRef, useState } from 'react';
import { fetchDevices, selectDevices } from './features/device/deviceSlice.ts';
import DeviceList from './components/DeviceList.tsx';
import TopAppBar from './components/TopAppBar.tsx';
import DeviceOperations from './components/DeviceOperations.tsx';
import { DialogMode } from './models/DialogModeModel.ts';
import { GridCellParams } from '@mui/x-data-grid';
import { Device } from './models/DeviceModel.ts';

const App = () => {
    const firstRender = useRef(true);
    const dispatch = useAppDispatch();
    const devices = useAppSelector(selectDevices);

    const [mode, setMode] = useState<DialogMode | null>(null);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    useEffect(() => {
        if (firstRender.current) dispatch(fetchDevices());
        firstRender.current = false;
    }, []);

    const handleDeviceOperationMode = (mode: DialogMode | null) => setMode(mode);

    const onAddClick = () => handleDeviceOperationMode(DialogMode.ADD);

    const onCellClick = (params: GridCellParams) => {
        setSelectedDevice(params.row as Device);
        handleDeviceOperationMode(DialogMode.EDIT);
    };

    return (
        <>
            {Boolean(mode) && (
                <DeviceOperations
                    mode={mode}
                    setMode={setMode}
                    selectedDevice={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                />
            )}
            <TopAppBar onAddClick={onAddClick} />
            <main className="h-screen w-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white shadow-md rounded">
                    <DeviceList data={devices} onCellClick={onCellClick} />
                </div>
            </main>
        </>
    );
};

export default App;
