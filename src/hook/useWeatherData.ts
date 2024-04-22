import { GeoData } from "@/interface/Geo-Date";
import { WeatherDate, WeatherResponse } from "@/interface/Weather-Date";
import { useQuery } from "@tanstack/react-query";

const API_KEY = "a444fe22d218251c383739249655853e";

export function useWeatherData(lat: number, lon: number) {
  if(!lat){
    console.log("Não foi puxado a lat")
  }
  console.log(lat)
  const data1 = useQuery({
    queryKey: ["geo-data", lat, lon],
    enabled: !!lat,
    queryFn: async () => {
      if (lat) {
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
     /*  "" */
       );

      const data = await response.json();

      return data;
    },
  });
  return {
    ...data1,
    data1: data1.data,
  };
}
