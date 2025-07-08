"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import axios from 'axios';

import Country from "../types/country";

const itemsPerPage = 8;

export default function CountryList() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Country[]>([]);  


  useEffect(() => {
    axios
      .get<Country[]>('/api')
      .then(res => {
        setData(res.data);
        console.log('🎉 Datos recibidos:', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  const regions = useMemo(() => {
    const unique = Array.from(new Set(data.map(c => c.region)));
    return ["All", ...unique];
  }, [data]);

  const filteredData = useMemo(() => {
    return data
      .filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
      .filter(country =>
        selectedRegion === "All" ? true : country.region === selectedRegion
      );
  }, [data, search, selectedRegion]);


  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedRegion]);

  const flagEmojiToCode = (flag: string): string => {

  if (!flag || [...flag].length !== 2) return '';

  return [...flag]
    .map(cp => {
      const code = cp.codePointAt(0);
      if (code === undefined) return '';
      return String.fromCharCode(code - 0x1F1E6 + 0x41);
    })
    .join('')
    .toLowerCase();        
};

  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 px-4 lg:px-0 py-6 sm:grid-cols-2">

        <label className="bg-gray-200 dark:bg-gray-900 px-4 py-2 rounded-sm flex space-x-2 cursor-text w-full sm:max-w-64">

          <input
            type="text"
            placeholder="Search for a country"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="text-gray-700 dark:placeholder:text-gray-400 dark:text-gray-400 focus:outline-none"
          />
        </label>


        <div className="relative ml-auto w-full sm:max-w-64">
          <button
            onClick={() => setIsOpen(open => !open)}
            className="w-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 rounded-sm py-2 px-4 flex justify-between items-center"
          >
            {selectedRegion}

          </button>
          {isOpen && (
            <ul className="absolute w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md max-h-40 overflow-y-auto">
              {regions.map(region => (
                <li
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {region}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Grid de países */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 lg:px-0 w-full max-w-5xl mx-auto">
        {paginatedData.map(country => (
          
          <div
            key={country.name.common}  
            className="bg-white rounded-lg shadow-sm dark:bg-gray-700/50"
          >
            <>
           
            </>
            <Link href={`/country/${encodeURIComponent(country.name.common)}`}>
              <img
                className="rounded-t-lg aspect-video object-center object-cover"
                src={`https://flagcdn.com/${flagEmojiToCode(country.flag)}.svg`}
                alt={`${country.name.common} flag`}
              />
            </Link>
            <div className="p-5">
              <Link href={`/country/${encodeURIComponent(country.name.common)}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {country.name.common}
                </h5>
              </Link>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Population:</span>{" "}
                <span className="font-light">{country.population.toLocaleString()}</span>
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Region:</span>{" "}
                <span className="font-light">{country.region}</span>
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Capital:</span>{" "}
                <span className="font-light">{country.capital}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center space-x-2 my-6">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-950 text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-950 text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
}
