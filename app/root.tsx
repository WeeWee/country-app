import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import {
	getSession as getSessionTheme,
	commitSession as commitSessionTheme,
} from "~/utils/theme-preference";
import {
	getSession as getSessionCountry,
	commitSession as commitSessionCountry,
} from "./utils/countries-cookie";
import {
	ActionFunction,
	json,
	LoaderFunction,
	redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { DarkModeState } from "~/hooks/usedarkmode";
import styles from "./tailwind.css";
import Api from "~/api";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export const loader: LoaderFunction = async ({ request }) => {
	const url = new URL(request.url);
	const length = 12;
	const offset = Number(url.searchParams.get("offset")) || 0;
	const countryData = await Api(offset, length);
	const cookieHeader = request.headers.get("Cookie");
	const sessionTheme = await getSessionTheme(cookieHeader);
	const sessionCountry = await getSessionCountry(cookieHeader);
	const theme: DarkModeState = sessionTheme.get("colorMode") || "light";
	const countries = sessionCountry.get("countries") || countryData;
	sessionCountry.set("countries", countries);
	const countryCookie = await commitSessionCountry(sessionCountry);
	return json(
		{
			colorMode: theme,
			countries: countries.countries,
			offset: offset,
			length: length,
		},
		{
			headers: {
				"Set-Cookie": countryCookie,
			},
		}
	);
};
export const action: ActionFunction = async ({ request }) => {
	const cookieHeader = request.headers.get("Cookie");
	const sessionTheme = await getSessionTheme(cookieHeader);
	const theme: DarkModeState = sessionTheme.get("colorMode") || "light";
	const newTheme = theme === "light" ? "dark" : "light";
	sessionTheme.set("colorMode", newTheme);
	const cookie = await commitSessionTheme(sessionTheme);
	//console.log(session.data.colorMode);
	return redirect("/", {
		headers: {
			"Set-Cookie": cookie,
		},
	});
};
export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};
export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "New Remix App",
	viewport: "width=device-width,initial-scale=1",
});
export type ContextType = {
	colorMode: DarkModeState;
	countries: any;
	offset: number;
	length: number;
};
export default function App() {
	const { colorMode, countries, offset, length } = useLoaderData();
	const Context: ContextType = { colorMode, countries, offset, length };
	console.log(offset);
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body
				className={
					colorMode === "light" ? "" : "bg-background-color text-light-color"
				}
			>
				<div
					className={
						(colorMode === "light" ? "" : "shadow-primary-color shadow-lg") +
						"sticky right-0 top-0 px-10 h-20 w-full flex justify-between items-center text-lg"
					}
				>
					<Link to="/">Home</Link>
					<div className="flex items-center">
						<input
							placeholder="Country"
							className={
								(colorMode === "light" ? "" : " bg-background-color") +
								" w-20 h-6"
							}
						/>
						<button className="pl-2">
							<MagnifyingGlassIcon className="w-5 h-5" />
						</button>
					</div>
					<Form method="post" className="w-[26px] h-[26px]">
						<button type="submit">
							{colorMode === "light" ? (
								<MoonIcon className=" text-background-color w-[26px] h-[26px]" />
							) : (
								<SunIcon className="text-light-color/70 hover:text-light-color/95 w-[26px] h-[26px]" />
							)}{" "}
						</button>
					</Form>
				</div>
				<Outlet context={Context} />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
