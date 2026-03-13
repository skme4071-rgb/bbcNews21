import { useEffect, useRef, useState } from "react";
import {
    FaImage, FaVideo, FaTimes, FaMusic,
    FaPlus, FaEdit, FaTrash, FaTasks,
} from "react-icons/fa";

import { CustomNotification } from "./Element";
import { useFetch } from "./../hooks/CommonHooks";





export function FilePreviewAndInputObjact(fileCollBack) {


    const localPreviewRef = useRef(null);

    const [prev, setPrev] = useState(null)

    const previewClear = () => {
        if (localPreviewRef.current) {
            URL.revokeObjectURL(localPreviewRef.current);
            localPreviewRef.current = null;
        }

        setPrev(null)
    };


    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (localPreviewRef.current) {
            URL.revokeObjectURL(localPreviewRef.current);
        }

        const url = URL.createObjectURL(file);
        localPreviewRef.current = url;

        setPrev(url)
        fileCollBack?.(file);
    };



    useEffect(() => {
        return () => {
            if (localPreviewRef.current) {
                URL.revokeObjectURL(localPreviewRef.current);
            }
        };
    }, []);


    const FileInput = ({
        className,
        accept = "image",
        children,
        icon: Icon,
        ...rest
    }) => {


        return (
            <label
                {...rest}
                className={`relative inset-0 hover:bg-gray-200 z-50 flex items-center justify-center cursor-pointer ${className}`}
            >
                <span className="absolute">
                    {children ?? (Icon && <Icon />)}
                </span>
                <input
                    accept={accept}
                    type="file"
                    className="hidden outLine-none"
                    onChange={handleFile}
                />
            </label>
        )

    }
    const FilePreview = ({
        className,
        mssage,
        children,
        icon: Icon,
        imgClassName,
        ...rest
    }) => {


        return (
            <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
                {
                    prev ?
                        <>
                            <img
                                src={prev}
                                {...rest}
                                className={`w-full h-full ${imgClassName}`}
                            />
                            <button
                                onClick={previewClear}
                                className="absolute  right-0 top-0 text-red-500  p-0.5 bg-white  font-medium rounded-full hover:bg-indigo-200 ">
                                <FaTimes />
                            </button>
                        </> :
                        <div className="w-full h-full   g items-center justify-center">
                            {children ?? (Icon && <Icon className="w-4 h-4 text-gray-400 inline" />)}
                            <p className=" text-xs text-gray-400 mt-1 capitalize text-center">{mssage}</p>
                        </div>
                }
            </div>)
    }



    return [FileInput, FilePreview]


}
// export function FileInput({
//     className,
//     fileCollBack,
//     accept = "image",
//     children,
//     icon: Icon,
//     ...rest

// }) {



//     const localPreviewRef = useRef(null);

//     const FileChange = (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         if (localPreviewRef.current) {
//             URL.revokeObjectURL(localPreviewRef.current);
//         }

//         const previewUrl = URL.createObjectURL(file);
//         localPreviewRef.current = previewUrl;
//         fileCollBack?.(file, previewUrl);
//     };

//     useEffect(() => {
//         return () => {
//             if (localPreviewRef.current) {
//                 URL.revokeObjectURL(localPreviewRef.current);
//             }
//         };
//     }, []);


//     return (
//         <label
//             {...rest}
//             className={`relative inset-0 hover:bg-gray-200 z-50 flex items-center justify-center cursor-pointer ${className}`}
//         >
//             <span className="absolute">
//                 {children ?? (Icon && <Icon />)}
//             </span>
//             <input

//                 accept={accept}
//                 type="file"
//                 className="hidden outLine-none"
//                 onChange={FileChange}
//             />
//         </label>


//     )


// }

// export function FilePreviewAndInput({
//     className,
//     imgClassName,
//     fileCollBack,
//     accept = "image",
//     children,
//     fileClear = () => { },
//     icon: Icon,
//     ...rest
// }) {


//     const [preview, setPreview] = useState(null);
//     const localPreviewRef = useRef(null);

//     const handleFile = (e) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         if (localPreviewRef.current) {
//             URL.revokeObjectURL(localPreviewRef.current);
//         }

//         const url = URL.createObjectURL(file);
//         localPreviewRef.current = url;



//         setPreview(url);
//         fileCollBack?.(file);
//     };

//     const previewClear = () => {
//         if (localPreviewRef.current) {
//             URL.revokeObjectURL(localPreviewRef.current);
//             localPreviewRef.current = null;
//         }
//         fileClear()
//         setPreview(null);
//     };

//     useEffect(() => {
//         return () => {
//             if (localPreviewRef.current) {
//                 URL.revokeObjectURL(localPreviewRef.current);
//             }
//         };
//     }, []);




//     return (
//         <div className={`relative flex items-center justify-center   ${className}`}>
//             <label
//                 className=" flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:bg-gray-200   w-full h-full"

//             >
//                 {preview ? console.log(accept) : ""}

//                 {preview ? (
//                     accept === "image" ? (
//                         <img src={preview} {...rest} className={`w-full h-full ${imgClassName}`} />
//                     ) : accept === "video" ? (
//                         <video controls src={preview} {...rest} className={`w-full h-full ${imgClassName}`} />
//                     ) : accept === "audio" ? (
//                         <audio controls src={preview} {...rest} className={`w-full h-full ${imgClassName}`} />
//                     ) : null
//                 ) : (
//                     <>
//                         <span>{children ?? (Icon && <Icon />)}</span>
//                         <p className="text-xs text-gray-400 capitalize">{accept}</p>
//                     </>
//                 )}

//                 <input
//                     accept={`${accept}/*`}
//                     type="file"
//                     className="hidden"
//                     onChange={handleFile}
//                 />
//             </label>
//             {preview && (
//                 <button
//                     onClick={previewClear}
//                     className="absolute   right-0 top-0 text-red-500  p-0.5 bg-white 
//                   font-medium rounded-full hover:bg-indigo-200 ">
//                     <FaTimes />
//                 </button>
//             )}
//         </div>

//     );
// }




export function FilePreviewAndInput({
    className,
    imgClassName,
    fileCollBack,
    accept = "image",
    children,
    fileClear = () => { },
    icon: Icon,
    ...rest
}) {
    const [preview, setPreview] = useState(null);
    const localPreviewRef = useRef(null);
    const inputRef = useRef(null);

    const handleFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (localPreviewRef.current) {
            URL.revokeObjectURL(localPreviewRef.current);
        }

        const url = URL.createObjectURL(file);
        localPreviewRef.current = url;

        setPreview(url);
        fileCollBack?.(file);

        // important fix
        e.target.value = "";
    };
    const previewClear = () => {
        if (localPreviewRef.current) {
            URL.revokeObjectURL(localPreviewRef.current);
            localPreviewRef.current = null;
        }

        setPreview(null);
        fileClear();

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (localPreviewRef.current) {
                URL.revokeObjectURL(localPreviewRef.current);
            }
        };
    }, []);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <label className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:bg-gray-200 w-full h-full">

                {preview ? (
                    accept === "image" ? (
                        <img
                            
                            src={preview}
                            {...rest}
                            className={`w-full h-full ${imgClassName}`}
                        />
                    ) : accept === "video" ? (
                        <video
                            type="video/mp4"
                            controls
                            src={preview}
                            {...rest}
                            className={`w-full h-full ${imgClassName}`}
                        />
                    ) : accept === "audio" ? (
                        <audio
                           
                            controls
                            src={preview}
                            {...rest}
                            className={`w-full ${imgClassName}`}
                        />
                    ) : null
                ) : (
                    <>
                        <span>{children ?? (Icon && <Icon />)}</span>
                        <p className="text-xs text-gray-400 capitalize">{accept}</p>
                    </>
                )}

                <input
                    ref={inputRef}
                    accept={`${accept}/*`}
                    type="file"
                    className="hidden"
                    onChange={handleFile}
                />
            </label>

            {preview && (
                <button
                    type="button"
                    onClick={previewClear}
                    className="absolute right-0 top-0 text-red-500 p-0.5 bg-white 
          font-medium rounded-full hover:bg-indigo-200"
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
}