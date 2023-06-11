const SERVER = import.meta.env.VITE_API_URL;

export default class Router {
    static get = (path: string) => `${SERVER}${path}`;

    static getDevices = this.get('/');
    static addDevice = this.get('/add');
    static updateDevice = this.get('/update');
    static deleteDevice = this.get('/delete');
}
