import { json } from "@remix-run/node";

const CountriesApi = async (offset: number, length: number) => {
	const data = await fetch(`https://restcountries.com/v3.1/all`).then((data) =>
		data.json()
	);

	return {
		countries: data.slice(offset, length + offset),
		offset: offset,
		length: length,
	};
};
export default CountriesApi;
