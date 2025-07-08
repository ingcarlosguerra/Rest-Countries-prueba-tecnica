import axios from 'axios';

async function fetchBasicCountries() {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all', {
      params: {
        fields: 'name,capital,region,population,flags'
      }
    });
    console.log(response.data);
  } catch (error: any) {
    console.error('Error al obtener países:', error.response?.data || error.message);
  }
}

fetchBasicCountries();
