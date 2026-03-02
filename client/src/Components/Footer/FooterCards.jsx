import { CustomRoundedButton, CustomLink, CustomNavLink } from "./../../utilities/Element";


export function MideaLink() {
    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Follow BBC News:</span>
            <div className="flex space-x-3">

                <CustomLink className="" to="https://www.facebook.com/" >
                    <CustomRoundedButton className="bg-blue-600" text="f" />
                </CustomLink>

                <CustomLink className="" to="https://www.facebook.com/" >
                    <CustomRoundedButton className="bg-blue-400 hover:bg-blue-500" text="t" />
                </CustomLink>

                <CustomLink className="" to="https://www.youtube.com/" >
                    <CustomRoundedButton className="bg-red-700 hover:bg-red-400" text="▶" />
                </CustomLink>

            </div>
        </div>
    );
}

export function LishLink({ pagesName = [], lishName = "News" }) {
    return (
        <div>
            <h4 className="font-bold mb-4 text-base flex items-center">
                <span className="mr-2">📰</span>
                {lishName}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
                {pagesName.map((v, i) => {
                    return (
                        <CustomNavLink
                            key={i}
                            text={v}
                            to={v === "Home" ? "/" : `/${v.toLowerCase()}`}
                            end={v === "/"} // 
                        />
                    );
                })}
            </ul>
        </div>
    );
}

export function Download() {
    return (
        <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Download BBC News App</span>
            <div className="flex space-x-2">
                <a
                    href="#"
                    className="bg-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                >
                    iOS
                </a>
                <a
                    href="#"
                    className="bg-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                >
                    Android
                </a>
            </div>
        </div>
    );
}
export function Copyright() {
    return (
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-400">
            <p className="leading-relaxed">
                Copyright © 2024 BBC. The BBC is not responsible for the content of
                external sites.
                <a href="#" className="text-blue-400 hover:underline transition-colors">
                    Read about our approach to external linking.
                </a>
            </p>
        </div>
    );
}


