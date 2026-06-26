export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: { text: string; icon: string; code: number };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
    uv: number;
    pressure_mb: number;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: { text: string; icon: string };
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: { icon: string };
      }>;
    }>;
  };
}