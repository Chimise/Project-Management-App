import React, {Fragment} from "react";
import { render, RenderOptions } from "@testing-library/react";
import AuthProvider from "../store/AuthContext/AuthContext";
import { UIContextProvider } from "../store/UIContext";
import { SWRConfig } from "swr";
import { sendRequest } from "../utils";
import RequestError from "../utils/RequestError";
import userEvent from '@testing-library/user-event';
import Layout from "../components/common/Layout";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UIContextProvider>
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
        <Layout>
        {children}
        </Layout>
              
        </SWRConfig>
      </UIContextProvider>
    </AuthProvider>
  );
};

const user = userEvent.setup({advanceTimers: jest.advanceTimersByTime})

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, {...options, wrapper: Wrapper});
export * from '@testing-library/react';
export {customRender as render, user};