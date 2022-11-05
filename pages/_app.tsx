import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import DashboardLayout from "../components/common/DashboardLayout";
import TaskContextProvider from "../store/TaskContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskContextProvider>
      <DashboardLayout>
        <Component {...pageProps} />
        </DashboardLayout>
    </TaskContextProvider>
  );
}

export default MyApp;
