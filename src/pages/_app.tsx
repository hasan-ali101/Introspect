import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Nav />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
