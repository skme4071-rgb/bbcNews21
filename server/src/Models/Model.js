import mongoose from "mongoose";

import {
    mediaSchema,
    newsSchema,
    userSchema,
    sourceSchema
} from "./Schema.js";

export const User = mongoose.model("User", userSchema);
export const News = mongoose.model("News", newsSchema);
export const Media = mongoose.model("Media", mediaSchema);
export const Source = mongoose.model("Source", sourceSchema);