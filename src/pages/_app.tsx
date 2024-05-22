import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <ThemeProvider attribute="class">
        <Nav />
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
}
