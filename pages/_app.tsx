import React from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { SWRConfig } from "swr";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import DashboardLayout from "../components/common/DashboardLayout";
import InfoContextProvider from "../store/InfoContext";
import Layout from "../components/common/Layout";
import Auth from "../components/common/Auth";
import AuthProvider from "../store/AuthContext";
import RequestError from "../utils/RequestError";
import { sendRequest } from "../utils";
import { UIContextProvider } from "../store/UIContext";

type Page = {
  getLayout?: (children: React.ReactNode) => JSX.Element;
  isAuth?: boolean;
} & NextPage;

type App = {
  Component: Page;
} & AppProps;

const fallBackLayout = (children: React.ReactNode) => {
  return <Layout>{children}</Layout>;
};

const authLayout = (children: React.ReactNode) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

function MyApp({ Component, pageProps }: App) {
  const { pathname } = useRouter();
  const isAuth = Component.isAuth;
  const defaultLayout = isAuth ? authLayout : fallBackLayout;
  const getLayout = Component.getLayout || defaultLayout;

  return (
    <AuthProvider>
      <UIContextProvider>
        <InfoContextProvider>
          <SWRConfig
            value={{
              fetcher: async (url: string, token?: string) => {
                const data = await sendRequest<any, any>({
                  method: "GET",
                  url,
                  token,
                });
                return data;
              },
              onErrorRetry: (err, key, config, revalidate, { retryCount }) => {
                if (
                  err instanceof RequestError &&
                  (err.statusCode === 401 || err.statusCode === 404)
                )
                  return;
                if (retryCount >= 3) return;

                setTimeout(() => revalidate({ retryCount }), 5000);
              },
            }}
          >
            {isAuth ? (
              <Auth>
                {getLayout(<Component {...pageProps} key={pathname} />)}
              </Auth>
            ) : (
              getLayout(<Component {...pageProps} key={pathname} />)
            )}
          </SWRConfig>
        </InfoContextProvider>
      </UIContextProvider>
    </AuthProvider>
  );
}

export default MyApp;
