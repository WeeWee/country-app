import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Api from "~/api";

export const loader: LoaderFunction = async () => {
	const countries = await Api();
	return countries;
};
export default function Index() {
	const data = useLoaderData();
	//console.log(data);
	return (
		<div className="p-4">
			<h1 className="text-3xl font-semibold">Welcome to Country app!</h1>

			<div className="grid grid-cols-4 gap-4">
				{data.map((country: any) => {
					return (
						<div className=" border border-gray-400 rounded-2xl ">
							<div className="p-2 flex flex-row">
								<img
									className="rounded-full w-40 h-40 border border-gray-400"
									key={country.name.common}
									src={country.flags.png}
									alt={country.name.common}
								/>
								<div className="flex flex-col justify-center items-center px-2">
									<h4>{country.name.common}</h4>
									<p className="text-sm px-4 underline hover:text-gray-500">
										<a target="_blank" href={country.maps.googleMaps}>
											google maps
										</a>
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
