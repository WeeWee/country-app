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
  type ActionFunction,
  json,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import styles from "./tailwind.css";
import Api, { GetCountry } from "~/api";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { DarkModeState } from "./hooks/usedarkmode";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const length = 12;
  const offset = Number(url.searchParams.get("offset")) || 0;
  const searchParam = url.searchParams.get("country");
  let countryData = searchParam
    ? await GetCountry(searchParam)
    : await Api(offset, length);
  const countries =
    searchParam && countryData.status != 404
      ? countryData?.country
      : countryData?.countries;
  const cookieHeader = request.headers.get("Cookie");
  const sessionTheme = await getSessionTheme(cookieHeader);
  const theme: DarkModeState = sessionTheme.get("colorMode") || "light";
  return json(
    {
      status: countryData.status,
      searchParam: searchParam,
      colorMode: theme,
      countries: countries,
      offset: offset,
      length: length,
    },
    {
      headers: {
        "Cache-Control": `public, max-age=${10}, s-max-age=${100}`,
      },
    }
  );
};
export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);

  const cookieHeader = request.headers.get("Cookie");
  const sessionTheme = await getSessionTheme(cookieHeader);
  const theme: DarkModeState = sessionTheme.get("colorMode") || "light";
  const newTheme = theme === "light" ? "dark" : "light";
  sessionTheme.set("colorMode", newTheme);
  const cookie = await commitSessionTheme(sessionTheme);
  //console.log(session.data.colorMode);
  return redirect(url.href, {
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
  title: "Country app, Assignment from Borås YH",
  viewport: "width=device-width,initial-scale=1",
});
export type ContextType = ReturnType<typeof loader>;
export default function App() {
  const { colorMode, countries, offset, length, status, searchParam } =
    useLoaderData<ReturnType<typeof loader>>();
  const formRef = useRef(null);
  const Context: ReturnType<typeof loader> = {
    colorMode,
    countries,
    offset,
    length,
    status,
    searchParam,
  };
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
            (colorMode === "light"
              ? "bg-white "
              : "shadow-primary-color bg-background-color    ") +
            " z-20 fixed right-0 top-0 px-10 h-20  w-full flex justify-between items-center text-lg"
          }
        >
          <Link to="/">Home</Link>
          <div className="flex items-center">
            <Form ref={formRef}>
              <input
                type="text"
                name="country"
                placeholder="Country"
                className={"border-none bg-transparent w-20 h-6"}
              />
              <button
                type="submit"
                className="pl-2"
                onSubmit={() => {
                  formRef.current.reset();
                }}
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>
            </Form>
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
