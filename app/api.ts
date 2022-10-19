import { json } from "@remix-run/node";
const url = `https://restcountries.com/v3.1/`;
const fieldUrl = `?fields=name,flags,maps`;
const CountriesApi = async (offset: number, length: number) => {
  const data = await fetch(`${url}all${fieldUrl}`).then(async (response) => {
    console.log(response.status);
    return {
      status: response.status,
      data: await response.json(),
    };
  });
  return {
    countries: data.data.slice(offset, length + offset),
    status: data.status,
    offset: offset,
    length: length,
  };
};
export const GetCountry = async (name: string | null) => {
  const data = await fetch(`${url}name/${name}${fieldUrl}`).then(
    async (response) => {
      console.log(response.status, "get country");
      return {
        status: response.status,
        data: await response.json(),
      };
    }
  );

  return {
    country: data.data,
    status: data.status,
  };
};
export default CountriesApi;
