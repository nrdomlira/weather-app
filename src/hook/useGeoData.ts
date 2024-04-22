import { GeoData, GeoDataResponse } from "@/interface/Geo-Date";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const API_KEY = "a444fe22d218251c383739249655853e";

export function useGeoData(name: String) {
  //console.log(name)
  const data = useQuery<GeoDataResponse>({
    queryKey: ["geo-data", ],
    enabled: !!name,
    queryFn: async () => {
      if (!name) {
        console.log("Não tem cidade")
      }
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`
      
       );

      const data = await response.json();

      return data;
    },
    placeholderData: keepPreviousData,
  });
  return {
    ...data,
    data: data?.data
  };
}
