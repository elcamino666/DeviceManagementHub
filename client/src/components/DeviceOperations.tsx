import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogMode } from '../models/DialogModeModel';
import { useState } from 'react';
import Axios from 'axios';
import Router from '../Router/Router';
import { useAppDispatch } from '../app/hooks';
import { addDevice, deleteDeviceById, updateDevice } from '../features/device/deviceSlice';
import { Device } from '../models/DeviceModel';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveIcon from '@mui/icons-material/Save';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

interface Props {
    mode: DialogMode | null;
    setMode: (mode: DialogMode | null) => void;
    selectedDevice: Device | null;
    setSelectedDevice: (device: Device | null) => void;
}

export default function FormDialog({ mode, setMode, selectedDevice, setSelectedDevice }: Props) {
    const dispatch = useAppDispatch();
    const [name, setName] = useState(selectedDevice?.name ? selectedDevice.name : '');
    const [nameError, setNameError] = useState(false);

    const [type, setType] = useState(selectedDevice?.type ? selectedDevice.type : '');
    const [typeError, setTypeError] = useState(false);

    const [ownerName, setOwnerName] = useState(
        selectedDevice?.ownerName ? selectedDevice.ownerName : ''
    );
    const [ownerNameError, setOwnerNameError] = useState(false);

    const [batteryStatus, setBatteryStatus] = useState(
        selectedDevice?.batteryStatus ? selectedDevice.batteryStatus.toString() : ''
    );
    const [batteryStatusError, setBatteryStatusError] = useState(false);

    const handleClose = () => setMode(null);

    const hasFormError = () => {
        let error = false;

        error = validateField(name, setNameError) || error;
        error = validateField(type, setTypeError) || error;
        error = validateField(ownerName, setOwnerNameError) || error;
        error = validateField(batteryStatus, setBatteryStatusError) || error;

        if (
            batteryStatus.trim() !== '' &&
            (isNaN(Number(batteryStatus)) ||
                Number(batteryStatus) < 0 ||
                Number(batteryStatus) > 100)
        ) {
            setBatteryStatusError(true);
            error = true;
        }
        return error;
    };

    const handleAddDevice = async () => {
        try {
            if (hasFormError()) return;

            const device = {
                name,
                type,
                ownerName,
                batteryStatus,
            };

            const { data: newDevice } = await Axios.post(Router.addDevice, device);
            dispatch(addDevice(newDevice));
            setMode(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdateDevice = async () => {
        try {
            if (hasFormError()) return;

            const device = {
                id: selectedDevice?.id,
                name,
                type,
                ownerName,
                batteryStatus,
            };
            const { data: updatedDevice } = await Axios.put(Router.updateDevice, device);
            dispatch(updateDevice(updatedDevice));
            setSelectedDevice(null);
            setMode(null);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteDevice = async () => {
        try {
            await Axios.delete(Router.deleteDevice, {
                data: { id: selectedDevice?.id },
            });
            dispatch(deleteDeviceById(selectedDevice?.id));
            setSelectedDevice(null);
            setMode(null);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Dialog open={Boolean(mode)} onClose={handleClose}>
            <DialogTitle>
                {mode === DialogMode.EDIT ? 'Update Device' : 'Add a New Device'}
            </DialogTitle>
            <DialogContent>
                {mode === DialogMode.EDIT ? (
                    <p className="text-gray-400">
                        You are about to update the information for the selected device. Please
                        ensure that the details entered are accurate and up-to-date. This action
                        will modify the device records in our database.
                    </p>
                ) : (
                    <p className="text-gray-400">
                        Please fill out the form below with the details of the device you want to
                        add. Make sure all information is correct before submitting. Thank you for
                        helping keep our device database up-to-date!
                    </p>
                )}
                <br />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Device Name"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                    helperText={nameError ? 'Device name is required' : ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Device Type"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    error={typeError}
                    helperText={typeError ? 'Device type is required' : ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    label="Owner Name"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    error={ownerNameError}
                    helperText={ownerNameError ? 'Owner name is required' : ''}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Battery Status"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={batteryStatus}
                    onChange={(e) => setBatteryStatus(e.target.value)}
                    error={batteryStatusError}
                    helperText={batteryStatusError ? 'Battery status is required' : ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {mode === DialogMode.EDIT && (
                    <Button
                        startIcon={<DeleteForeverRoundedIcon />}
                        color="error"
                        variant="contained"
                        onClick={handleDeleteDevice}
                    >
                        Delete
                    </Button>
                )}
                <Button
                    startIcon={mode === DialogMode.ADD ? <AddRoundedIcon /> : <SaveIcon />}
                    variant="contained"
                    onClick={mode === DialogMode.ADD ? handleAddDevice : handleUpdateDevice}
                >
                    {mode === DialogMode.ADD ? 'Add' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const validateField = (
    fieldValue: string,
    setError: React.Dispatch<React.SetStateAction<boolean>>
): boolean => {
    if (fieldValue.trim() === '') {
        setError(true);
        return true;
    } else {
        setError(false);
        return false;
    }
};
