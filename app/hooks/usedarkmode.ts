import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { getSession, commitSession } from "~/utils/theme-preference";
export type DarkModeState = "dark" | "light";
export type SetDarkModeState = React.Dispatch<
	React.SetStateAction<DarkModeState>
>;
const preferDarkQuery = "(prefers-color-scheme: dark)";
export const loader: LoaderFunction = async ({ request }) => {
	const cookieHeader = request.headers.get("Cookie");
	const session = await getSession(cookieHeader);
	const theme: DarkModeState =
		session.get("colorMode") || matchMedia(preferDarkQuery).matches
			? "dark"
			: "light";
	session.set("colorMode", theme);
	const cookie = await commitSession(session);
	return json(
		{
			session,
		},
		{
			headers: {
				"Set-Cookie": cookie,
			},
		}
	);
};
function useDarkMode() {
	const data = useLoaderData();
	/* console.log("data: ");
	console.log(data); */
	console.log(data);
	const [mode, setMode] = useState<DarkModeState>(() => {
		/* const lsVal = localStorage.getItem("colorMode");
		if (lsVal) {
			return lsVal === "dark" ? "dark" : "light";
		} else {
			return matchMedia(preferDarkQuery).matches ? "dark" : "light";
		 */
		return data.session;
	});

	useEffect(() => {
		const mediaQuery = matchMedia(preferDarkQuery);
		const handleChange = () => {
			setMode(mediaQuery.matches ? "dark" : "light");
		};
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	/* useEffect(() => {
		localStorage.setItem("colorMode", mode);
	}, [mode]); */

	// we're doing it this way instead of as an effect so we only
	// set the localStorage value if they explicitly change the default
	return [mode, setMode] as const;
}

export default useDarkMode;
