import { FaTv, FaPlay, FaMusic, FaFire } from "react-icons/fa";

import {
  CustomLink,
  CustomImages,
  CustomPublishedAt,
  CustomCategory,
  CustomStringSlice,
} from "./../../utilities/Element";


export function LeadStoryCord({ data = {} }) {
  const { source, author, title, url, publishedAt, content, category, media } =
    data;

  const coverImage = media?.find((v) => v.type === "cover");

  return (
    <article className="border-b border-gray-200 pb-8">
      <div className="bg-gradient-to-br from-green-500 to-blue-600 relative h-full w-full sm:h-80  rounded-xl  overflow-hidden  ">
        <CustomImages src={coverImage?.url} alt="story image" />
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500 mt-4  ">
          <CustomCategory text={category} />
          {source?.logoToUrl && (
            <img src={source?.logoToUrl} className="w-6 h-6 rounded-full " />
          )}
          <CustomPublishedAt text={publishedAt} />
        </div>
        <CustomLink to={url ?? "/Details"} state={data}>
          <h1 className="text-2xl sm:text-4xl font-bold mt-3 hover:text-blue-600">
            {title}
          </h1>
        </CustomLink>
        <p className="text-gray-600 mt-4 leading-relaxed">
          <CustomStringSlice text={content} end={500} />
        </p>
        <span className="block mt-2 text-sm text-gray-500">{author}</span>
        <div className="flex flex-wrap gap-6 mt-6 text-gray-600"></div>
      </div>
    </article>
  );
}

export function SecondaryStoryCord({ datas = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {datas.map((story, i) => {
        const {
          source,
          author,
          title,
          publishedAt,
          content,
          category,
          media,
          url,
          id,
        } = story;

        const coverImage = media?.find((v) => v.type === "cover");

        return (
          <CustomLink
            state={story}
            key={id + i}
            to={url ?? "/Details"}
            rel="noopener noreferrer"
          >
            <article className="story-card p-4 rounded-xl cursor-pointer mobile-card-padding">
              <div className="bg-gradient-to-br from-green-500 to-blue-600 h-32 sm:h-40 mb-4 flex items-center justify-center rounded-lg shadow-md">
                <CustomImages src={coverImage?.url} alt="story image" />
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-500 font-medium flex items-center gap-2">
                  {source?.logoToUrl && (
                    <img
                      src={source.logoToUrl}
                      className="w-5 h-5 rounded-full"
                      alt="logo"
                    />
                  )}
                  <span className=" ">{category}</span>

                  <span>•</span>
                  <CustomPublishedAt text={publishedAt} />
                </div>

                <h2 className="text-lg sm:text-xl font-bold leading-tight mobile-story-title">
                  {title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mobile-story-text">
                  <CustomStringSlice text={content} end={100} />
                </p>

                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{author}</span>
                </div>
              </div>
            </article>
          </CustomLink>
        );
      })}
    </div>
  );
}
export function TopStoryCord({ name, datas = [] }) {
  return (
    <div className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold mb-6 gradient-text">{name}</h2>
      <div className="space-y-4">
        {datas.map((story, i) => {
          const {
            author,
            title,
            publishedAt,
            category,
            media,
            description,
            url,
            id,
          } = story;

          const coverImage = media?.find((v) => v.type === "cover");

          return (
            <CustomLink
              state={story}
              key={id + i}
              to={url ?? "/Details"}
              rel="noopener noreferrer"
            >
              <article className="story-card p-4 mb-5 rounded-xl cursor-pointer">
                <div className="flex space-x-4">
                  {/* Image */}
                  <div
                    className="bg-gradient-to-br from-purple-500 to-pink-600 w-[200px] max-[600px]:w-[100px]
                  flex items-center justify-center rounded-lg flex-shrink-0 shadow-md overflow-hidden"
                  >
                    <CustomImages src={coverImage?.url} alt="story image" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1 ">
                    <div className="text-xs text-gray-500 font-medium py-1">
                      {category} • <CustomPublishedAt text={publishedAt} />
                    </div>

                    <h3 className="font-bold text-base leading-tight break-all">
                      <CustomStringSlice list={title} end={150} />
                    </h3>

                    {/* Desktop only */}
                    <div className="hidden max-[376px]:hidden sm:block">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        <CustomStringSlice text={description} end={200} />
                      </p>

                      <div className="space-x-2 text-xs text-gray-500">
                        <CustomStringSlice list={author} end={25} />
                        <span>•</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile only */}
                <div className="block sm:hidden mt-3">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <CustomStringSlice list={description} end={200} />
                  </p>

                  <div className="space-x-2 text-xs text-gray-500">
                    <CustomStringSlice list={author} end={25} />
                    <span>•</span>
                  </div>
                </div>
              </article>
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
}
export function WatchListenCord({ audioLive = {}, videoLive = {} }) {
  function LiveCard({ icon: Icon, data = {}, bgColor }) {
    if (!data?.title) return null;

    return (
      <div className="flex space-x-3 cursor-pointer hover:bg-white/50 p-3 rounded-lg transition-all mobile-touch-target">
        <div
          className={`${bgColor} w-16 h-12 flex items-center justify-center rounded-lg flex-shrink-0 shadow-sm`}
        >
          <Icon className="text-white w-4 h-4" />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-sm">
            <CustomStringSlice text={data.title} end={35} />
          </h4>

          <p className="text-xs text-gray-600">
            <CustomStringSlice text={data.description || ""} end={45} />
          </p>

          <CustomLink
            to={data.url ?? "/Live"}
            state={data}
            target={data.url ? "_blank" : undefined}
            rel={data.url ? "noopener noreferrer" : undefined}
          >
            <div className="text-xs text-red-600 font-medium">LIVE NOW</div>
          </CustomLink>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect p-5 rounded-xl mobile-card-padding shadow-lg">
      <h3 className="font-bold mb-4 text-lg flex items-center">
        <span className="mr-2">
          <FaTv />
        </span>
        Watch/Listen
      </h3>
      <div className="space-y-3">
        <LiveCard icon={FaPlay} data={videoLive} bgColor="bg-red-600" />

        <LiveCard icon={FaMusic} data={audioLive} bgColor="bg-blue-600" />
      </div>
    </div>
  );
}
export function MostReadCord({ datas = [] }) {
  // data না থাকলে কিছু দেখাবে না
  if (!datas.length) return null;

  // array shuffle
  const shuffled = [...datas].sort(() => 0.5 - Math.random());

  // প্রথম 5টা item
  const connt = shuffled.slice(0, 5);

  return (
    <div className="glass-effect p-5 rounded-xl shadow-lg">
      <h3 className="font-bold mb-4 text-lg flex items-center">
        <FaFire className="mr-2" color="orange" />
        Most Read
      </h3>

      <ol className="space-y-3">
        {connt.map((data, i) => (
          <CustomLink to={data.url} key={i} state={data}>
            <li className="flex items-start space-x-3 cursor-pointer hover:bg-white/50 p-3 rounded-lg transition-all">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold min-w-[24px] text-center">
                {i + 1}
              </span>
              <span className="text-sm font-medium leading-tight">
                {<CustomStringSlice text={data.title} end="60" /> ||
                  "No title available"}
              </span>
            </li>
          </CustomLink>
        ))}
      </ol>
    </div>
  );
}
export function WeatherCord({ name, WeatherData }) {
  const { C_High, C_Low, message, city, icon, bodyIcon } = WeatherData;
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-5 rounded-xl shadow-lg">
      <h3 className="font-bold mb-4 flex items-center">
        <img src={icon} alt="weather" className="w-6 h-6 mr-2" />
        {name}
      </h3>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-3xl font-bold">{C_High}°C</p>
          <p className="text-sm opacity-90">{city}</p>
        </div>
        <div className="text-5xl">{bodyIcon}</div>
      </div>

      <p className="text-sm opacity-90 mb-3">{message}</p>

      <div className="flex justify-between text-xs opacity-75">
        <span>High: {C_High}°C</span>
        <span>Low: {C_Low}°C</span>
      </div>

      <CustomLink
        to="/Weather"
        state={WeatherData}
        className="text-sm underline mt-3 inline-block hover:no-underline transition-all"
      >
        7-day forecast →
      </CustomLink>
    </div>
  );
}




export function LocalWeatherCord({ name, icon, WeatherData = [] }) {
  return (
    <div className="glass-effect p-5 rounded-xl shadow-lg">
      <h3 className="font-bold mb-4 flex items-center">
        <span className="mr-2">{icon}</span>
        {name}
      </h3>
      <div className="space-y-3 text-sm">
        {WeatherData.map((Data, i) => {
          const { bodyIcon, C_High, city } = Data
          return (
            <CustomLink
              state={Data}
              key={i}
              to={Data.url}
              rel="noopener noreferrer"
            >
              <div className="flex justify-between items-center p-2 rounded-lg bg-white/30">
                <span className="font-medium">{city}</span>
                <span className="flex items-center space-x-1">
                  <span>{C_High}°C</span>
                  <span>{bodyIcon}</span>
                </span>
              </div>
            </CustomLink>
          )
        })}
      </div>
    </div >
  );
}
export function DetailsArticleCord({ data = {} }) {
  const { source, author, publishedAt, content, description, category, media, } = data;
  const coverImage = media?.find((v) => v.type === "cover");

  return (
    <article className="border-b border-gray-200 pb-8">
      <div className="bg-gradient-to-br from-red-600 to-blue-600 h-64 mb-4 flex items-center justify-center rounded-xl shadow-lg">
        <CustomImages src={coverImage?.url} />
      </div>
      <div className="space-y-3">
        <div className="text-xs flex flex-wrap gap-3 items-center  text-gray-500 font-medium ">
          <CustomCategory text={category} />
          {source?.logoToUrl && (
            <img src={source?.logoToUrl} className="w-6 h-6 rounded-full " />
          )}
          <CustomPublishedAt text={publishedAt} />
        </div>
        <h2 className="text-1xl sm:text-3xl font-bold cursor-pointer  transition-colors" >
          {description}
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          {content}
        </p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="font-medium">{author}</span>
          <span>{source.name}</span>
        </div>
        <div className="flex flex-wrap gap-6 mt-6 text-gray-600">

        </div>
      </div>
    </article>
  )
}
export function PoliticsCord({ name, icon, datas = [] }) {
  return (
    <div className="glass-effect p-5 rounded-xl shadow-lg">
      <h3 className="font-bold mb-4 flex items-center">
        <span className="mr-2">{icon}</span>
        {name}
      </h3>

      <div className="space-y-3 text-sm">
        {datas.map((Data, i) => {
          const { title, description } = Data
          return (
            <CustomLink
              state={Data}
              key={i}
              to={Data.url}
              rel="noopener noreferrer"
            >
              <div className="cursor-pointer hover:bg-white/50 p-3 rounded-lg transition-all">
                <h4 className="font-semibold mb-1">
                  <CustomStringSlice text={title} end={530} />
                </h4>
                <p className="text-xs text-gray-600">
                  <CustomStringSlice text={description} end={50} />
                </p>
              </div>

            </CustomLink>
          )

        })}
      </div>
    </div>
  );
}
