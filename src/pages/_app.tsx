import "@/styles/globals.css";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import BackgroundImage from "@/components/background-image";
import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

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
            <main
              className={cn(
                `-pb-8 relative z-0 flex min-h-screen flex-col items-center overflow-clip bg-gradient-to-t from-[white] to-light-primary px-4 pt-12 text-white dark:from-dark-secondary dark:to-dark-primary`,
                montserrat.className,
              )}
            >
              <BackgroundImage />
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
