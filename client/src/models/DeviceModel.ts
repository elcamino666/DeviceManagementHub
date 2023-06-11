enum DeviceType {
    Smartphone = 'Smartphone',
    Tablet = 'Tablet',
    Camera = 'Camera',
}

export interface Device {
    id: number;
    name: string;
    type: DeviceType;
    ownerName: string;
    batteryStatus: number;
}
