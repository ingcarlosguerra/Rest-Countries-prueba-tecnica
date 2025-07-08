import type { NextApiRequest, NextApiResponse } from 'next';
import restCountriesApi from '../lib/axios';
import { Country } from '@/app/types/country';

type NameResponse = Country[] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NameResponse>
) {
  const { name } = req.query;

  if (!name || Array.isArray(name)) {
    return res.status(400).json({ error: 'Parámetro "name" es requerido y debe ser un string.' });
  }

  const fields = [
    'name', 'capital', 'region', 'subregion',
    'population', 'languages', 'currencies',
    'flags', 'borders', 'maps'
  ].join(',');
  const endpoint = `/name/${encodeURIComponent(name.toString())}?fields=${fields}`;

  try {
    const { data } = await restCountriesApi.get<Country[]>(endpoint);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('Error al consultar REST Countries API:', error.message);
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'País no encontrado.' });
    }
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Error Interno del Servidor';
    return res.status(status).json({ error: message });
  }
}
