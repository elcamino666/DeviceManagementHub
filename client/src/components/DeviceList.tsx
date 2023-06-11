import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { Device } from '../models/DeviceModel';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'ownerName', headerName: 'Owner Name', width: 170 },
    {
        field: 'batteryStatus',
        headerName: 'Battery Status',
        type: 'number',
        width: 170,
    },
];

interface Props {
    data: Device[];
    onCellClick: (params: GridCellParams) => void;
}

export default function DeviceList({ data, onCellClick }: Props) {
    return <DataGrid rows={data} columns={columns} onCellClick={onCellClick} />;
}
