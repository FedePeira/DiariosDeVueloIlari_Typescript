import { DiaryEntry, Visibility, Weather } from "../src/types";
import toNewDiaryEntry from "../src/utils";

const data = [
  {
    "id": 1,
    "date": "2017-01-01",
    "weather": "rainy",
    "visibility": "poor",
    "comment": "Pretty scary flight, I'm glad I'm alive"
  },
  {
    "id": 2,
    "date": "2017-04-01",
    "weather": "sunny",
    "visibility": "good",
    "comment": "Everything went better than expected, I'm learning much"
  }
];

function convertToWeatherType(weatherString: string, visibilityString: string): { weather: Weather; visibility: Visibility } {
 const weatherMap: { [key: string]: Weather } = {
    sunny: Weather.Sunny,
    rainy: Weather.Rainy,
    cloudy: Weather.Cloudy,
    stormy: Weather.Stormy,
    windy: Weather.Windy
 };

 const visibilityMap: { [key: string]: Visibility } = {
    poor: Visibility.Poor,
    good: Visibility.Good,
    great: Visibility.Great,
    ok: Visibility.Ok
 };

 return {
    weather: weatherMap[weatherString],
    visibility: visibilityMap[visibilityString]
 };
}

const diaryEntries: DiaryEntry[] = data.map(obj => {
  const { weather, visibility } = convertToWeatherType(obj.weather, obj.visibility);
  const convertedObj = {
    ...obj,
    weather,
    visibility
  };

  const object = toNewDiaryEntry(convertedObj) as DiaryEntry;
  object.id = obj.id;
  return object;
});

export default diaryEntries;