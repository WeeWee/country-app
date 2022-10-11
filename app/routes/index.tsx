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
		<div>
			<h1 className="text-3xl font-semibold">Welcome to Country app!</h1>

			<div className="grid grid-cols-4">
				{data.map((element: any) => {
					console.log(element.iso2Code);
					return (
						<div>
							<h4>{element.name}</h4>
							<img
								key={element.name}
								src={`https://countryflagsapi.com/png/${element.iso2Code}`}
								alt={""}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
