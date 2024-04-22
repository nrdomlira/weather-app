export type GeoData = {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface GeoDataResponse {
  data: GeoData[]
}