import type { NextApiRequest, NextApiResponse } from 'next';
import restCountriesApi from '@/app/(pages)/api/countries/lib/axios';
import type { Country } from '@/app/types/country';

type RegionResponse = Country[] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegionResponse>
) {
  const { region } = req.query;
  if (!region || Array.isArray(region)) {
    return res.status(400).json({ error: 'Parámetro "region" requerido y debe ser string.' });
  }

  const regionParam = region.toString().toLowerCase();
  const endpoint = regionParam === 'all'
    ? '/all'
    : `/region/${encodeURIComponent(regionParam)}`;

  try {
    const { data } = await restCountriesApi.get<Country[]>(endpoint);
    return res.status(200).json(data);
  } catch (error: any) {
    // Si no existe ruta externa o falla, devolvemos error con status
    const status = error.response?.status ?? 500;
    const message = error.response?.data?.message ?? 'Error Interno del Servidor';
    console.error('API Error:', error.message);
    return res.status(status).json({ error: message });
  }
}