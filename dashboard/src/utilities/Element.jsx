import { NavLink, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import logo_PNG from "./../assets/images/logo.png";
// import Logo_SVG from "./../assets/images/logo.svg";
import { FaImage, FaVideo, FaTimes, FaMusic, FaPlus, FaEdit, FaTrash, FaTasks } from "react-icons/fa";

// import { useState, useEffect } from 'react';
export function Input({ value, placeholder, className, ...rest }) {
    return (
        <input
            {...rest}
            placeholder={placeholder ?? value}
            className={` p-2 border rounded w-full ${className}`}
            value={value}
        />
    );
}
export function Textarea({ value, placeholder, className, ...rest }) {
    return (
        <textarea
            {...rest}
            placeholder={placeholder ?? value}
            className={`mb-3 p-2 border rounded w-full ${className}`}
            value={value}
        ></textarea>
    );
}
export function CustomPublishedAt({ text }) {
    return (<span >{text && new Date(text).toLocaleDateString()}</span>)
}
export function CustomCategory({ text }) {
    return (<span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
        {text ?? text}
    </span>)
}

export function CustomVideo({ className = "", alt = "Video", ...rest }) {

    return (
        <video
            {...rest}
            alt={alt}
            controls
            className={`w-full h-full object-cover ${className}`}
        />
    );
}
export function CustomAudio({ className = "", alt = "Audio", ...rest }) {

    return (
        <audio
            {...rest}
            alt={alt}
            controls
            className={`w-full h-full object-cover ${className}`}
        />
    );
}

export function CustomImages({ className = "", alt = "Image", ...rest }) {
    return (
        <img
            {...rest}
            alt={alt}
            className={`w-full h-full object-cover ${className}`}
        />
    );
}

export function CustomButton({ children, text, ...rest }) {
    return (
        <button
            type="button"
            className="border border-white px-6 py-2 rounded hover:text-blue-900"
            {...rest}
        >
            {children ?? text}
        </button>
    );
}
export function CustomError({ children, text, ...rest }) {
    return (
        <p {...rest} className="text-red-500  flex items-start text-sm">
            {children ?? text}
        </p>
    );
}

export function CustomRoundedButton({ children, text, className, ...rest }) {
    return (
        <button
            type="button"
            className={`w-8 h-8 bg-blue-400 ${className ? className : "bg-blue-400"} rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer`}
            {...rest}
        >
            <span className="text-white text-xs"> {children ?? text} </span>
        </button>
    );
}

export function CustomLink({ children, text, ...rest }) {
    return <Link {...rest}> {children ?? text}</Link>;
}

export function CustomNavLink({
    text,
    children,
    className = "",
    activeFun,
    end,
    ...rest
}) {
    return (
        <NavLink
            {...rest}
            end={end}
            className={({ isActive }) => {
                // Base class
                const baseClass = `flex capitalize items-center rounded-lg  space-x-3 transition-colors ${className}`;
                // Active / inactive
                const activeClass = isActive
                    ? "font-semibold bg-[#3b82f6]"
                    : "text-gray-600";

                // Optional custom active function
                if (activeFun) return `${baseClass} ${activeFun(isActive)}`;

                return `${baseClass} ${activeClass}`;
            }}
        >
            {children ?? text}
        </NavLink>
    );
}
export function CustomLoading({ text, messgae, children, className }) {
    return (
        <div className={`text-center ${className}`}>
            <div className="loading-spinner mx-auto "></div>
            {text && <h2 className="text-2xl font-bold mb-2 capitalize">{text}</h2>}
            {messgae || children && <p className="text-gray-600">{messgae ?? children}</p>}

        </div>
    );
}

export function CustomNotification({ message, type = 'info', children }) {
    const colors = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white',
        warning: 'bg-yellow-600 text-white'
    };

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 3000); // 3 সেকেন্ড পরে auto hide
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 ${visible ? 'translate-x-0' : 'translate-x-full'} ${colors[type]}`}>
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    {type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-medium">{message ?? children}</p>
                </div>
                <button onClick={() => setVisible(false)} className="flex-shrink-0 text-white/80 hover:text-white">
                    <span className="text-lg">×</span>
                </button>
            </div>
        </div>
    );
}
export function CustomStringSlice({ text, end, start = 0, }) {

    if (!text || typeof text !== "string") return <span></span>

    const sliced = text.length > end
        ? text.slice(start, end)
        : text

    return (
        <span>
            {text.length > end
                ? sliced + "..."
                : sliced}
        </span>
    );
}


export const Emoji = {
    // Dashboard / Navigation
    Dashboard: "📊",
    Settings: "⚙️",
    Logout: "🚪",
    Workflow: "🔄",
    Articles: "📝",
    SmartEditor: "✍️",
    Review: "👀",
    Analytics: "📈",
    Collaboration: "🤝",
    MediaHub: "🖼️",
    Users: "👥",
    ApiIntegration: "🔌",

    // Topbar / UI Elements
    Notification: "🔔",
    Sun: "☀️",
    Dark: "🌙",
    Plus: "➕",
    Moon: "🌙",
    Bookmark: "🔖"
};


export const TextareaAutoResize = ({
    value,
    onChange,
    placeholder,
    className,
    ...rest
}) => {
    const textareaRef = useRef(null);

    // Function to auto resize
    const autoResize = () => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };

    // Run on value change
    useEffect(() => {
        autoResize();
    }, [value]);

    return (
        <textarea
            {...rest}
            ref={textareaRef}
            value={value}
            onChange={(e) => {
                onChange(e);
                autoResize(); // resize as user types
            }}
            placeholder={placeholder}
            className={`w-full resize-none outline-none  overflow-hidden ${className}`}

        />
    );
};

export const CRUDbutton = ({
    icon: Icon,
    label,
    color = "green",
    iconOnly = false,
    className,
    ...rest
}) => {
    const colors = {
        green: "bg-green-400 hover:bg-green-500",
        blue: "bg-blue-600 hover:bg-blue-400",
        red: "bg-red-600 hover:bg-red-700",
        purple: "bg-purple-600 hover:bg-purple-700",
    };

    return (
        <button
            {...rest}
            className={`w-full h-8 ${colors[color]} ${className} rounded flex items-center justify-center gap-2 text-white font-semibold text-sm transition`}
        >
            {Icon && <Icon size={18} />}
            {!iconOnly && label}
        </button>
    );
};

export const Select = ({ options, onChange, value, ...rest }) => {
    return (
        <div className="common-select">
            <select {...rest} value={value} onChange={(e) => onChange(e)}>
                {options.map((option, i) => {
                    const val = typeof option === "string" ? option : option.value;
                    const label = typeof option === "string" ? option : option.label;
                    return (
                        <option key={val + i} value={val}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

// export function LogoSVG() {
//     return (
//         <div className="flex h-15 justify-center w-40 items-center overflow-hidden">
//             <img
//                 className="bg-red  h-13 w-auto transform  scale-320"
//                 src={Logo_SVG}
//                 alt="Logo"
//             />
//         </div>
//     );
// }
// export function LogoPNG() {
//     return (
//         <div className="flex h-15 justify-center w-40 items-center overflow-hidden">
//             <img
//                 className="bg-red  h-13 w-auto transform  scale-320"
//                 src={logo_PNG}
//                 alt="Logo"
//             />
//         </div>
//     );
// }




export function WindowScrollTop() {
    const fabRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!fabRef.current) return;

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 300) {
                fabRef.current.style.opacity = "1";
                fabRef.current.style.transform = "scale(1)";
            } else {
                fabRef.current.style.opacity = "0";
                fabRef.current.style.transform = "scale(0.8)";
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // পেজ লোড হলে check করতে

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <button
            ref={fabRef}
            className="fixed right-10 bbc-red bottom-10 z-50 rounded-[50%] test-w text-white w-10 h-10  opacity-0 scale-90 transition-all duration-300 r"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            ↑
        </button>

    );
}


export const CustomMainLabel = ({ name = null, ObjName = null, value, handleChange }) => {

    const names = ObjName ? `${ObjName}.${name}` : name;

    const [inputText, setInputText] = useState("");
    return (
        <label
            htmlFor={name}
            className="w-full block capitalize p-3 text-sm   text-gray-500  bg-gray-100  font-bold border border-gray-200 rounded-lg  "
        >
            {/* Write your  */}
            {name}
            <TextareaAutoResize
                id={name}
                name={names}
                value={value}
                onChange={(e) => handleChange(e)}
                // placeholder={"Inter"}
                className=" text-base font-bold  text-sm text-gray-600 outline-none "
            />

            <div className="flex  gap-3 hidden flex-wrap-none pt-2 p-2 justify-between items-center  h-7  ">
                <form className="text-sm w-full w-5 h-5 ">
                    <input
                        type="search"
                        className=" mb-3 w-full text-sm  text-gray-400 outline-none  px-1"
                        placeholder="Ask Ai"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                </form>
                <div className="flex space-x-1 gap-1">
                    <button className="w-5 h-5 p-1 hover:bg-gray-100 rounded">
                        <FaPlus className="w-4 h-4" />
                    </button>
                    <button className="w-5 h-5 p-1 hover:bg-gray-100 rounded">
                        <FaTasks className="w-4 h-4" />
                    </button>
                    <button className=" p-1 hover:bg-gray-100 rounded">
                        <FaEdit className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </label>
    )
}



export const AccessRole = ({ accessRole = ["user"], role, AccessComponet }) => {
    if (!role || !accessRole.includes(role)) return
    return typeof AccessComponet === "function" && <AccessComponet />
};


export function CustomUndo({ undoFun = () => { } }) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm 
      bg-red-600 text-white transform transition-all duration-300
      ${visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
            <div className="flex items-center justify-between gap-4">

                <p className="text-sm font-medium">
                    Article deleted
                </p>

                <button
                    onClick={() => {
                        undoFun();
                        setVisible(false);
                    }}
                    className="bg-white text-red-600 px-3 py-1 rounded text-xs font-semibold hover:bg-gray-100"
                >
                    Undo
                </button>

            </div>
        </div>
    );
}