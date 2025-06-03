"use client";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import countryOptions from "../../countries.json";
import {
  useOriginalProduct,
  useProductDispatch,
} from "@/providers/ProductProvider";

const FilterBar = () => {
  const originProduct = useOriginalProduct();
  const dispatch = useProductDispatch();

  const [searchQuery, setSearchQuery] = useState<{
    category: string;
    name: string;
    country: string;
    priceRange: { minPrice: number; maxPrice: number };
  }>({
    category: "",
    name: "",
    country: "",
    priceRange: {
      minPrice: 0,
      maxPrice: 1000,
    },
  });

  useEffect(() => {
    if (originProduct && dispatch) {
      dispatch({
        type: "FILTER_PRODUCT",
        origin: originProduct,
        searchQuery: searchQuery,
      });
    }
  }, [searchQuery, dispatch, originProduct]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice = Number(e.target.value);
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      priceRange: {
        ...prevQuery.priceRange,
        minPrice,
      },
    }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxPrice = Number(e.target.value);
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      priceRange: {
        ...prevQuery.priceRange,
        maxPrice,
      },
    }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "minRange") {
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        priceRange: {
          ...prevQuery.priceRange,
          minPrice: Number(value),
        },
      }));
    } else if (name === "maxRange") {
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        priceRange: {
          ...prevQuery.priceRange,
          maxPrice: Number(value),
        },
      }));
    }
  };

  return (
    <div className="hidden md:lg:block ">
      <div className="flex flex-col max-h-[750px] gap-5 bg-white drop-shadow-lg rounded-lg p-5 sticky top-10">
        <h1 className="font-bold text-4xl">Filters</h1>

        <div>
          <p className="font-semibold flex flex-col">Search:</p>
          <label className="input input-md input-bordered flex items-center gap-2">
            <input
              type="text"
              id="name"
              value={searchQuery.name || ""}
              onChange={(e) =>
                setSearchQuery((prevQuery) => ({
                  ...prevQuery,
                  name: e.target.value,
                }))
              }
              className="grow font-medium"
              placeholder="Search by..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div>
          <div className="hover:cursor-pointer items-center gap-3 flex justify-center border-solid border-2 rounded-lg w-fit px-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="w-3 h-3"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <p className="text-sm">Add Filter</p>
          </div>
        </div>

        <div className="divider"></div>
        <div>
          <p className="font-semibold flex flex-col">Location:</p>

          <Autocomplete
            className="w-full"
            onChange={(_, value) =>
              setSearchQuery((prevQuery) => ({
                ...prevQuery,
                country: value || "",
              }))
            }
            options={countryOptions.map((option) => option.name)}
            value={searchQuery.country}
            isOptionEqualToValue={(option, value) =>
              option === value || value === ""
            }
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="Country" />
            )}
          />
        </div>

        <div className="divider"></div>
        <div className="mb-4">
          <div className="font-semibold flex flex-col">
            Price range:
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="from"
                value={searchQuery.priceRange.minPrice}
                onChange={handleMinChange}
                className="w-32 px-2 border-solid border-2 rounded-md"
              />
              <input
                type="text"
                placeholder="to"
                value={searchQuery.priceRange.maxPrice}
                onChange={handleMaxChange}
                className="w-32 px-2 border-solid border-2 rounded-md"
              />
            </div>
          </div>
          <div className="mt-2">
            <input
              name="minRange"
              type="range"
              min={0}
              max={10000}
              value={searchQuery.priceRange.minPrice}
              onChange={handleRangeChange}
              className="range range-sm"
            />
            <input
              name="maxRange"
              type="range"
              min={0}
              max={10000}
              value={searchQuery.priceRange.maxPrice}
              onChange={handleRangeChange}
              className="range range-sm mt-1"
            />
            <div className="flex w-full justify-between px-2 text-xs">
              <span>$0</span>
              <span>$5000</span>
              <span>$10000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
