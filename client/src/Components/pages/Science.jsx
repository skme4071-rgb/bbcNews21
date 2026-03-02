
import { useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";



import { useFetch } from "./../../hooks/CommonHooks";
import { CustomArraySlice } from "./../../utilities/CommonFuntion.js";
import { CustomLoading, CustomNotification , } from "./../../utilities/Element";import {
  LeadStoryCord,
  SecondaryStoryCord,
  TopStoryCord,
  WatchListenCord,
  MostReadCord,
  WeatherCord,
} from "./../Article/allArticleCord";
import { API_URL } from "./../../config";



export default function Science() {
  const { pathname } = useLocation();
  const oneCallApi = useRef(true);
 const { res, loading, error, refetch } = useFetch(
    `${API_URL}/Articles${pathname}`,
  );
  useEffect(() => {
    if (oneCallApi.current) {
      refetch();
      oneCallApi.current = false;
    }
  }, [refetch]);
  if (loading) {
    return (
      <CustomLoading
         text={pathname === "/" ? "Home" : pathname.slice(1)}
        messgae="Loading international news and global affairs..."
      />
    );
  }

  if (error) {
    return <CustomNotification type="error" message={error} />;
  }

  if (!res || res.status !== "ok") {
    return (
      <CustomNotification type="warning" message="Failed to load news data." />
    );
  }

  const articles = res.articles || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-8">
        <LeadStoryCord data={articles[0]} />
        <SecondaryStoryCord datas={CustomArraySlice(articles, 1, 11)} />
        <TopStoryCord name="More top stories" datas={CustomArraySlice(articles, 11, 16)} />
      </div>

      <div className="space-y-6 mobile-sidebar-spacing">
        <WatchListenCord audioLive={articles[0]} videoLive={articles[3]} />
        <MostReadCord datas={articles} />
        <WeatherCord
          name="Today Weather"
          WeatherData={{
            C_High: 9.7,
            C_Low: 4.5,
            message: "Sunny",
            city: "London",
            icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            bodyIcon: "☀️",
          }}
        />
      </div>
    </div>
  );
}
