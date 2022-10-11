const CountriesApi = async () => {
	const data = await fetch(
		`http://api.worldbank.org/v2/country?format=json`
	).then((data) => data.json());

	return data[1];
};
export default CountriesApi;
