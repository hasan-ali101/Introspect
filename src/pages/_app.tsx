import "@/styles/globals.css";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            <Nav />
            <main className="relative">
              <Component {...pageProps} />
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
