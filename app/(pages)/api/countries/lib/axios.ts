import axios from 'axios';

const restCountriesApi = axios.create({
  baseURL: process.env.RESTCOUNTRIES_BASE_URL ?? 'https://restcountries.com/v3.1',
  timeout: 5000,
});

export default restCountriesApi;