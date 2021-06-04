import axios from 'axios';

const serverProtocol = process.env.REACT_APP_HOST_PROTOCOL || 'http';
const serverHost = process.env.REACT_APP_HOST_SERVER || 'localhost';
const serverPort = process.env.REACT_APP_PORT_SERVER || '5000';
const serverURL = serverProtocol === 'https' ? `${serverProtocol}://${serverHost}`: `${serverProtocol}://${serverHost}:${serverPort}`;

const INSTANCE = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' }
});

export class ServerAPI {

  static async uploadImage(data) {
    return INSTANCE.post('/images', data).then( (response) =>  response );
  }

  static async processImg(data) {
    return INSTANCE.post('/images/yolo', data).then( (response) =>  response );
  }

}
