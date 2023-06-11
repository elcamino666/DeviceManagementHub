import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Button } from '@mui/material';

interface Props {
    onAddClick: () => void;
}

const TopAppBar = ({ onAddClick }: Props) => {
    return (
        <div className="fixed bg-white w-full p-4 shadow flex justify-between z-[100]">
            <div className="flex gap-4 items-center">
                <ImportantDevicesIcon />
                <span className="font-bold">Device Manager Hub</span>
            </div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddRoundedIcon />}
                onClick={onAddClick}
            >
                Add Device
            </Button>
        </div>
    );
};

export default TopAppBar;
