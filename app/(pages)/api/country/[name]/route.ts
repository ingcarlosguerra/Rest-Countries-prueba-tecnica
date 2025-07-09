
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: { name: string } }
) {
  const { name } = params;                 

  try {
    const { data } = await axios.get(
      `${process.env.RESTCOUNTRIES_BASE_URL}/name//${encodeURIComponent(name)}`,
      {

        params: {
          fields:
            'flags,flag,name,borders,population,region,capital,subregion,currencies,languages',

        },
      }
    );

    const country = Array.isArray(data) ? data[0] : data;
    //console.log(country);
    return NextResponse.json(country);
  } catch (error: any) {
    const status = error.response?.status ?? 500;
    const message = error.response?.data ?? error.message;
    console.error('Error al obtener país:', message);
    return NextResponse.json({ error: message }, { status });
  }
}
