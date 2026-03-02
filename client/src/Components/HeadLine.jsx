import { CustomLink } from "../utilities/Element"
import HeadLine from "./HeadLine";
import classes from "./../style/HeadLine.module.css";

const title = [
  { title: "tilel text namre " },
  { title: "tilel text namre " },
  { title: "tilel text namre " },
  { title: "tilel text namre " },
]
export default function Breaking_banner() {

  return (
    <div className="breaking-banner text-white py-2 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-center text-center">
        <CustomLink
          to="/Live"
          text="live"
          className="bg-white text-red-600 uppercase px-3 py-1 text-xs font-bold mr-3 rounded-full shadow-sm"
        />

        <div className="overflow-hidden flex-1 min-w-0 relative">
          <div
            className={`capitalize whitespace-nowrap ${classes.animateMarquee} `}
          >
            {title?.map((v) => v.title).join(" ")}
          </div>
        </div>

      </div>
    </div>
  );
}
