import { useLocation } from 'react-router-dom';

import { DetailsLeyout } from "../Leyout";
import { DetailsArticleCord, LocalWeatherCord, PoliticsCord, WeatherCord } from "./../Article/allArticleCord";
import { CustomArraySlice } from "./../../utilities/CommonFuntion.js";




const dd = [
  {
    title: "Security experts have disclosed details ",
    description: "Security experts have disclosed details  have disclosed details description"
  },
  {
    title: "Security experts have disclosed details ",
    description: "Security experts have disclosed details  have disclosed details description"
  },
]
const oo = [
  { C_High: 9.7, city: "London", bodyIcon: "☀️", },
  { C_High: 9.7, city: "Uk", bodyIcon: "☀️", },
  { C_High: 9.7, city: "London", bodyIcon: "☀️", },
  { C_High: 9.7, city: "London", bodyIcon: "☀️", },
  { C_High: 9.7, city: "London", bodyIcon: "☀️", },
  { C_High: 9.7, city: "London", bodyIcon: "☀️", },
]

export default function Details() {
  const data = useLocation().state
  const { title, category } = data


  return (
    <DetailsLeyout {...{ title, category }}>

      <div className="lg:col-span-2 space-y-8">
        <DetailsArticleCord data={data} />
      </div>

      <div className="space-y-6">
        <PoliticsCord icon="🏛️" name="Politics" datas={CustomArraySlice(dd, 0, 2)} />
        <LocalWeatherCord name="Local Weather" icon="🌤️" WeatherData={CustomArraySlice(oo, 0, 5)} />
      </div>

    </DetailsLeyout >
  );
}

