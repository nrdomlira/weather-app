export interface WeatherDate {
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  weather: [
    {
      id: number;
      main: string;
    }
  ];
  wind:{
    speed: number;
  };
  clouds:{
    all: number
  }
}

export interface WeatherResponse {
  data: WeatherDate[];
}
