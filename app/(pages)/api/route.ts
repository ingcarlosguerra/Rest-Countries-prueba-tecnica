import axios from 'axios';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const { data } = await axios.get(`${process.env.RESTCOUNTRIES_BASE_URL}/all`, {
      params: { fields: 'flags,flag,name,borders,population,region,capital,subregion,currencies,languages' }
    });
    //console.log(data);
    return NextResponse.json(data);
  } catch (error: any) {
    const status = error.response?.status ?? 500;
    const message = error.response?.data ?? error.message;
    console.error('Error al obtener países:', message);
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}