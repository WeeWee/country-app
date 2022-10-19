import Buttons from "~/components/buttons";

import { useOutletContext } from "@remix-run/react";
import type { ContextType } from "~/root";

export default function Index() {
  const { colorMode, countries, offset, length, status, searchParam } =
    useOutletContext<ContextType>();
  //console.log(colorMode);

  return (
    <div className={" p-4 overflow-y-auto pt-24"}>
      <h1 className="text-3xl font-semibold">Welcome to Country app!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {status != 404 ? (
          countries?.map((country: any) => {
            return (
              <div
                key={country.name.common}
                className={
                  (colorMode === "light"
                    ? ""
                    : "hover:shadow-primary-color/50 shadow-primary-color") +
                  "  rounded-2xl hover:scale-105 z-10  hover:z-40 shadow-lg hover:shadow-xl transition-all duration-150"
                }
              >
                <div className="p-2 flex flex-row">
                  <img
                    className="m-2 w-40 h-32  2xl:w-60 2xl:h-40 border border-gray-400"
                    key={country.name.common}
                    src={country.flags.png}
                    alt={country.name.common}
                  />
                  <div className="flex flex-col justify-center items-center text-center px-2">
                    <h4>{country.name.common}</h4>
                    <p className="text-sm lg:px-4 underline hover:text-gray-500">
                      <a target="_blank" href={country.maps.googleMaps}>
                        google maps
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center col-span-full">
            <h1>
              Status <b className="text-red-500">{status}</b>
            </h1>
            <p>
              <b>{searchParam}</b> is not a country
            </p>
          </div>
        )}
      </div>
      <div>
        {status != 404 ? <Buttons offset={offset} length={length} /> : ""}
      </div>
    </div>
  );
}
