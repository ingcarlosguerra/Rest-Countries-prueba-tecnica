"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import type Country from "../types/country";

const itemsPerPage = 8;

const spinner =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 30' fill='#888'><circle cx='15' cy='15' r='15'><animate attributeName='opacity' from='1' to='0.2' dur='0.8s' repeatCount='indefinite'/></circle><circle cx='60' cy='15' r='15' opacity='0.2'><animate attributeName='opacity' from='0.2' to='1' dur='0.8s' repeatCount='indefinite'/></circle><circle cx='105' cy='15' r='15'><animate attributeName='opacity' from='1' to='0.2' dur='0.8s' repeatCount='indefinite'/></circle></svg>`
  );

export default function CountryList() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<Country[]>("/api")
      .then((res) => setData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(data.map((c) => c.region)))],
    [data]
  );

  const filteredData = useMemo(
    () =>
      data
        .filter((c) =>
          c.name.common.toLowerCase().includes(search.toLowerCase())
        )
        .filter((c) =>
          selectedRegion === "All" ? true : c.region === selectedRegion
        ),
    [data, search, selectedRegion]
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  useEffect(() => setCurrentPage(1), [search, selectedRegion]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <img src={spinner} alt="Loading" className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-4 px-4 lg:px-0 py-6 sm:grid-cols-2">
        <label className="bg-gray-200 dark:bg-gray-900 px-4 py-2 rounded-sm flex space-x-2 w-full sm:max-w-64">
          <input
            type="text"
            placeholder="Search for a country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-gray-700 dark:placeholder:text-gray-400 dark:text-gray-400 focus:outline-none w-full"
          />
        </label>

        <div className="relative ml-auto w-full sm:max-w-64">
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="w-full bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-400 rounded-sm py-2 px-4 flex justify-between items-center"
          >
            {selectedRegion}
          </button>
          {isOpen && (
            <ul className="absolute w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md max-h-40 overflow-y-auto z-10">
              {regions.map((region) => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 lg:px-0 w-full max-w-5xl mx-auto">
        {paginatedData.map((country) => (
          <div
            key={country.name.common}
            className="bg-white dark:bg-gray-700/50 rounded-lg shadow-sm"
          >
            <Link href={`/country/${encodeURIComponent(country.name.common)}`}>
              <Image
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                width={300}
                height={180}
                className="rounded-t-lg object-cover aspect-video"
                placeholder="empty"
              />
            </Link>
            <div className="p-5">
              <Link href={`/country/${encodeURIComponent(country.name.common)}`}>
                <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {country.name.common}
                </h5>
              </Link>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                <span className="font-semibold">Capital:</span> {country.capital}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 my-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-950 text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-950 text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </>
  );
}
