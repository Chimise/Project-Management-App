import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/900.css'
import DashboardLayout from '../components/common/DashboardLayout';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <DashboardLayout>
    <Component {...pageProps} />
  </DashboardLayout>
  )

}

export default MyApp
