import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import DashboardLayout from "../components/common/DashboardLayout";
import TaskContextProvider from "../store/TaskContext";
import InfoContextProvider from "../store/InfoContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TaskContextProvider>
      <InfoContextProvider>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </InfoContextProvider>
    </TaskContextProvider>
  );
}

export default MyApp;
