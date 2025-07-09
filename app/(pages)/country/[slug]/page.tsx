import { redirect } from "next/navigation";
import data from "@/app/data/data.json";
import Image from "next/image";
import Link from "next/link";
import  Country  from '@/app/types/country';
import axios from "axios";


export default async function CountryDetails({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    
  const slug = (await params).slug


  const { data: apidata } = await axios.get<Country[]>(
    `https://restcountries.com/v3.1/name/${slug}`, {
              params: {
          fields:
            'flags,flag,name,borders,population,region,capital,subregion,currencies,languages',

        },
    }
  );
  

   console.log(apidata);

  const country: Country | undefined = apidata.find(
    (c) => c.name.common === decodeURIComponent(slug)
  );

  if (!country) { redirect("/")};

  interface PropertyProps {
    label: string;
    value: string | number | undefined;
    col?: "1" | "2";
  }

  const Property: React.FC<PropertyProps> = ({ label, value, col = "1" }) => {
    if (!value) return null;
    return (
      <p className={`text-gray-400 dark:text-gray-300 sm:col-span-${col}`}>
        <span className="font-semibold">{label}</span>{" "}
        <span className="font-light">{value}</span>
      </p>
    );
  };

  return (
    <>

      <div className="max-w-5xl mx-auto px-4 lg:px-0 py-6">
        <Link
          href="/"
          className="dark:bg-gray-600 dark:hover:bg-gray-900 cursor-pointer duration-200 ease-in-out w-fit flex items-center gap-2 py-2 px-6 rounded-md dark:text-gray-300 shadow-sm shadow-gray-950/20 bg-gray-200 hover:bg-gray-300"
        >
          Back
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 py-6 gap-8">
          <Image
            width={500}
            height={500}
            src={country.flags.svg}
            alt={`${country.flags.alt} flag`}
            className="w-full h-auto object-cover rounded-lg shadow-sm shadow-gray-950/20"
          />
          <div className="grid  sm:grid-cols-2 h-min my-auto py-6 gap-2">
            <h1 className="text-4xl font-semibold sm:col-span-2">
              {country.name.common}
            </h1>
            <Property label="Native Name:" value={country.name.official} />
            <Property
              label="Top Level Domain:"
              value={country.flag}
            />
            <Property label="Population:" value={country.population} />
            <Property
              label="Currencies:"
              value={
                  country.currencies &&
                  Object.values(country.currencies)
                    .map(({ name, symbol }) => `${name} (${symbol})`)
                    .join(", ")
                }

            />
            <Property label="Region:" value={country.region} />
            <Property
              label="Languages:"
                value={
                  country.languages &&
                  Object.values(country.languages).join(", ")
                }
            />
            <Property label="Sub Region:" value={country.subregion} col="2" />
            <Property label="Capital:" value={country.capital} />

            {country.borders && 
            <div className={`text-gray-400 dark:text-gray-300 sm:col-span-2 flex flex-col sm:flex-row space-x-4 `}>
              <p className="font-semibold text-nowrap py-2">Border Countries</p>{" "}
              <div className="flex flex-wrap gap-2">
              {country.borders?.map((name) => (
                <span key={name} className="flex items-center gap-2 py-2 px-6 rounded-md bg-gray-200 text-gray-600 dark:text-gray-300 dark:bg-gray-700 w-fit shadow-sm shadow-gray-950/20">
                  {name}
                </span>
              ))}
              </div>
            </div>
            }
          </div>
        </div>
      </div>

    </>
  );
}