import axios from 'axios';

export const apiUrl = BASE_API_URL;

export const request = axios.create({
  baseURL: apiUrl,
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, ' +
        'Origin, ' +
        'Accept, ' +
        'X-Requested-With, ' +
        'Content-Type, ' +
        'Access-Control-Request-Method, ' +
        'Access-Control-Request-Origin, ' +
        'Access-Control-Request-Headers'
  },
});

export const colors = {
  primary: {
    blue: '#539FE9',
    red: '#ED7671',
    grey: '#888F9D',
    green: '#55CF9C'
  },
  secondary: ['#D678F7', '#7CEC87', '#F3AC76', '#63ADF5', '#BCBFC5']
};
