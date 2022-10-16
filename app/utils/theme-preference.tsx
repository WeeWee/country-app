import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
	createCookieSessionStorage({
		cookie: {
			name: "theme-preference",
			maxAge: 604_800,
		},
	});
