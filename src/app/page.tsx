"use client";

import Main from "@/components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  /* async function getweatherData() {
    const weatherData = await fetch(BASE_URL);
    const data = await weatherData.json()
    console.log(weatherData);
  }

  useEffect(() => {
    getweatherData();
  }, []); */

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
