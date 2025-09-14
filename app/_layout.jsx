import { Stack } from "expo-router";
import { ThemeProvider } from "../src/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/services/i18n";
const queryClient = new QueryClient();

export default function Layout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
