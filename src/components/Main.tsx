import Image from "next/image";

import {
  CloudHailIcon,
  DropletsIcon,
  LeafIcon,
  MapPinIcon,
  SunIcon,
  WindIcon,
} from "lucide-react";

import clouds from "../assets/weather-clouds.svg";
import rain from "../assets/weather.svg";
import storm from "../assets/storm.svg";
import halfSun from "../assets/half-sun.svg";
import sun from "../assets/Sun.svg";
import chart from "../assets/Chart.svg";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import debounce from "lodash.debounce";
import { useDebounce } from "@/hook/useDebounce";

const API_KEY = "a444fe22d218251c383739249655853e";

interface WeatherDate {
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
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export default function Main() {
  const [searchCity, setSearchCity] = useState("Salvador");
  const [currentCity, setCurrentCity] = useState("Salvador");
  const [state, setState] = useState("");
  const [weatherData, setweatherData] = useState<WeatherDate>();
  const debounceSearch = useDebounce(searchCity);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${debounceSearch}&limit=1&appid=${API_KEY}`
    )
      .then((response) => {
        //return response.json();
        return response.json();
      })
      .then((dataResponse) => {
        console.log(dataResponse);
        setState(dataResponse[0].state);
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${dataResponse[0].lat}&lon=${dataResponse[0].lon}&appid=${API_KEY}`
        )
          .then((response) => {
            return response.json();
          })
          .then((weatherData) => {
            setweatherData(weatherData);
            console.log(weatherData);
          });
      });
    // console.log(debounceSearch)
  }, [debounceSearch]);

  /* function onChangedCity(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    setSearchCity(event.target.value)

    const teste = debounce(onChangedCity, 1000)

  } */
  //console.log(debounceSearch)

  return (
    <main className="flex flex-col space-y-36 px-20 justify-center items-center">
      <div>
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          /* onChange={onChangedCity} */
        />
        <span>{searchCity}</span>
      </div>
      <div className="flex gap-8">
        <div className="w-[480px] min-h-[480px] shadow-2xl bg-right-bottom bg-cover bg-[url('../assets/background.svg')] bg-no-repeat flex flex-col justify-between p-3 rounded-lg">
          {" "}
          <Image
            src={clouds}
            alt=""
            sizes="176px"
            className="absolute -translate-x-1/2 -translate-y-1/2"
          />
          <div className="flex justify-end items-center">
            <MapPinIcon size={24} fill="#C2BFF4" color="#9D99E4" />
            <span className="text-[#C2BFF4] text-sm font-semibold">
              {weatherData?.name}, {state?.substring(0, 2).toLocaleUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-center flex-col gap-1">
            <div className="flex ml-5">
              <strong className="text-8xl text-white">
                {(Number(weatherData?.main.temp) / 10).toFixed()}
              </strong>
              <span className="text-zinc-200 font-semibold text-2xl">°C</span>
            </div>

            <div className="flex justify-center items-center gap-1 text-2xl">
              <span className="font-medium text-zinc-100">
              {(Number(weatherData?.main.temp_min) / 10).toFixed(1)}°
                
              </span>
              <span className="font-medium text-zinc-300">
              {(Number(weatherData?.main.temp_max) / 10).toFixed(1)}°
              </span>
            </div>
          </div>
          <div className="flex justify-between h-16">
            <div className="flex gap-3 items-center px-4 py-3 rounded-md min-w-36 bg-[#6660C8]/60">
              <WindIcon size={24} className="text-[#C2BFF4]" />
              <div className="flex flex-col text-[#E7E6FB]">
                <span className="text-xs font-normal text-[#E7E6FB]">
                  Vento
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-lg">
                    {Math.floor(Number(weatherData?.wind.speed))}
                  </span>
                  <span className="font-bold text-sm text-[#DAD8F7]">km/h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center px-4 py-3 min-w-36  rounded-md bg-[#6660C8]/60">
              <DropletsIcon size={24} className="text-[#C2BFF4]" />
              <div className="flex flex-col text-[#E7E6FB]">
                <span className="text-xs font-normal text-[#E7E6FB]">
                  Umidade
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-lg">
                    {weatherData?.main.humidity}
                  </span>
                  <span className="font-bold text-sm text-[#DAD8F7]">%</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center px-4 py-3 min-w-36  rounded-md bg-[#6660C8]/60">
              <CloudHailIcon
                size={24}
                className="text-[#C2BFF4]"
                fill="#C2BFF4"
              />
              <div className="flex flex-col text-[#E7E6FB]">
                <span className="text-xs font-normal text-[#E7E6FB]">
                  Chuva
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-lg">
                    {weatherData?.clouds.all}
                  </span>
                  <span className="font-bold text-sm text-[#DAD8F7]">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="flex flex-col rounded-md justify-between min-h-60 items-center px-[18px] bg-[#6D67D0]/60 py-4">
              <div className="flex gap-2 mt-4">
                <LeafIcon size={24} fill="#DAD8F7" color="#6D67D0" />
                <span className="font-semibold text-base text-[#DAD8F7]">
                  Qualidade do ar
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#87EBCD] text-lg font-semibold">Boa</h1>
                <strong className="text-[#E7E6FB] text-4xl">21</strong>
              </div>

              <div className="flex gap-4 justify-center items-center text-[#E7E6FB]">
                <div className="flex flex-col items-center">
                  <span className="text-[#87EBCD] text-sm font-bold">12.9</span>
                  <span>PM2.5</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[#87EBCD] text-sm font-bold">12.9</span>
                  <span>PM10 </span>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <span className="text-[#87EBCD] text-sm font-bold">2.1</span>
                  <span>SO²</span>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <span className="text-[#87EBCD] text-sm font-bold">1.4</span>
                  <span>NO²</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[#87EBCD] text-sm font-bold">21.2</span>
                  <span>O²</span>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <span className="text-[#87EBCD] text-sm font-bold">0.7</span>
                  <span>CO</span>
                </div>
              </div>
            </div>
            <div className="rounded-md text-[#DAD8F7] bg-[#6D67D0]/60 flex flex-col gap-6 justify-center items-center p-4">
              <div className="flex mt-4 gap-2">
                <SunIcon size={24} />
                <span className=" text-base font-semibold ">
                  Horário do sol
                </span>
              </div>
              <Image src={chart} alt="" sizes="auto" />
              {/* <Image src={line} alt="" width={216} height={122} /> */}
              {/* <div className="flex w-full justify-between">
              <span>06:12</span>
              <span>18:52</span>
            </div> */}
            </div>
          </div>
          <div className="w-full p-10 flex gap-3 bg-[#6D67D0]/60 rounded-md">
            <div className="flex flex-col justify-center items-center px-4 gap-4">
              <span className="text-sm font-bold text-[#DAD8F7]">Amanhã</span>
              <Image src={clouds} width={64} height={64} alt="" />
              <div className="flex gap-1 text-base font-semibold ">
                <span className="text-white">21°</span>
                <span className="text-[#DAD8F7]">16°</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-4 gap-4">
              <span className="text-sm font-bold text-[#DAD8F7]">Sexta</span>
              <Image src={sun} width={64} height={64} alt="" />
              <div className="flex gap-1 text-base font-semibold ">
                <span className="text-white">28°</span>
                <span className="text-[#DAD8F7]">20°</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-4 gap-4">
              <span className="text-sm font-bold text-[#DAD8F7]">Sábado</span>
              <Image src={rain} width={64} height={64} alt="" />
              <div className="flex gap-1 text-base font-semibold ">
                <span className="text-white">25°</span>
                <span className="text-[#DAD8F7]">21°</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-4 gap-4">
              <span className="text-sm font-bold text-[#DAD8F7]">Domingo</span>
              <Image src={storm} width={64} height={64} alt="" />
              <div className="flex gap-1 text-base font-semibold ">
                <span className="text-white">20°</span>
                <span className="text-[#DAD8F7]">14°</span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center px-4 gap-4">
              <span className="text-sm font-bold text-[#DAD8F7]">Segunda</span>
              <Image src={halfSun} width={64} height={64} alt="" />
              <div className="flex gap-1 text-base font-semibold ">
                <span className="text-white">24°</span>
                <span className="text-[#DAD8F7]">18°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
