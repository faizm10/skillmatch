"use client";

import { ThemeProvider } from "../components/theme-provider";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </ThemeProvider>
  );
} 