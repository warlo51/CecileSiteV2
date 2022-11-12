import type { AppProps } from "next/app"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../styles/global.css"
import { EuphoriaScript_400Regular } from '@expo-google-fonts/euphoria-script';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
