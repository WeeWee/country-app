const CountriesApi = async () => {
	const data = await fetch(`https://restcountries.com/v3.1/all`).then((data) =>
		data.json()
	);

	return data.slice(0, 10);
};
export default CountriesApi;
