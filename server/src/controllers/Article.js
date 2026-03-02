import mongoose from "mongoose";
import createError from "http-errors";
import { Source, User, News } from "./../Models/Model.js";
import { fileCleanup } from "./../Middleware/multer.js";


export const Create = async (req, res, next) => {

    console.log(req.files);


    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { role, id } = req.user;
        const { url, type, name, purpose } = req.body;
        const file = req.files?.[0];

        if (!url || !type || !name || !purpose || !file) {
            throw createError(400, "All fields are required");
        }

        const isExists = await Source.findOne({ type }).session(session);
        if (isExists) {
            throw createError(409, "Source already exists");
        }

        const fileUrl = `${process.env.BASE_URL}/upload/${file.filename}`;

        const source = await Source.create([{
            role,
            createdBy: id,
            name,
            type,
            url,
            urlTologo: fileUrl,
            media: {
                filename: file.filename,
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                purpose,
                type: "image",
                url: fileUrl,
                createdBy: id,
            },
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            source: source[0],
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        await fileCleanup(req)
        return next(error);
    }
};


// ---------------- Update ----------------
export const Update = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { sourceType } = req.params;
        const { name, url, purpose } = req.body;
        const userId = req.user.id

        const source = await Source.findOne({ type: sourceType }).session(session).populate("createdBy");
        if (!source) throw createError(404, "Source not found");

        if (!source.createdBy._id.equals(userId)) {
            throw createError(403, "Unauthorized access");
        }
        // Update fields
        if (name) source.name = name;
        if (url) source.url = url;
        if (purpose) source.media.purpose = purpose;

        const oldFile = source.media; // keep old file reference

        // Optional: replace file
        if (req.files?.[0]) {
            const file = req.files[0];
            source.media = {
                filename: file.filename,
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                purpose: purpose || oldFile.purpose,
                type: "image",
                url: `${process.env.BASE_URL}/upload/${file.filename}`,
                createdBy: source.createdBy
            };
        }

        await source.save({ session });
        await session.commitTransaction();
        session.endSession();

        // Cleanup old file if new file uploaded
        if (req.files?.[0]) await fileCleanup({ files: [oldFile] });

        res.status(200).json({ success: true, source });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        // Cleanup uploaded new files if error
        if (req.files?.length > 0) await fileCleanup(req);

        next(error);
    }
};

// ---------------- Delete ----------------
export const Delete = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { sourceType } = req.params;

        const source = await Source.findOne({ type: sourceType }).session(session);
        if (!source) throw createError(404, "Source not found");



        await fileCleanup({ files: [source.media] });

        await Source.deleteOne({ _id: id }).session(session);

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Source deleted successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

// ---------------- Get Single ----------------
export const GetSingle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const source = await Source.findById(id);
        if (!source) throw createError(404, "Source not found");

        res.status(200).json({ success: true, source });
    } catch (error) {
        next(error);
    }
};

// ---------------- Get All ----------------
export const GetAll = async (req, res, next) => {
    try {
        const sources = await Source.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, sources });
    } catch (error) {
        next(error);
    }
};























// import News from "../Models/newsSchema.js";
// import { Source } from "../Models/models.js";

// export const articlesCreate = async (req, res) => {
//   try {

//     const { id } = req.user;
//     const {
//       title,
//       content,
//       description,
//       summary,
//       author,
//       category,
//       sourceType,
//       media,
//       tags,
//       state,
//       publishedAt,
//     } = req.body;



//     const source = await Source.findOne({ type: sourceType });
//     if (!source) throw createError(404, "source Type not funt");



//     const article = await News.create({
//       title,
//       content,
//       description,
//       summary,
//       author,
//       category,
//       source: source._id,
//       media: media || [],
//       tags: tags || [],
//       state: state || "draft",
//       publishedAt,
//       createdBy: req.user.id,
//     });





//     res.status(201).json({
//       message: "Article created successfully",
//       data: article,
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: "Article creation failed",
//       error: error.message,
//     });
//   }
// };


// export const allLetestArticles = async (req, res) => {
//   res.json({
//     status: "ok",
//     success: true,
//     totalResults: 4742,


//     articles: [
//       {
//         category: "Business",
//         media: [
//           {
//             type: "cover",
//             url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           }
//         ],
//         id: new Date(),
//         source: {
//           logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           , id: "lasetProdact123",
//           name: "Internet",
//           url: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },




//       {
//         id: `${new Date()}ew3`,
//         category: "UK",
//         source: {
//           id: "lasetProdact123",
//           name: "Internet",
//           category: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         id: `${new Date()}35`,
//         category: "Politics",
//         source: {
//           id: "lasetProdact123",
//           name: "Internet",
//           category: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         id: `${new Date()}34`,
//         category: "Sport",
//         source: {
//           id: "lasetProdact123",
//           name: "Internet",
//           category: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         id: `${new Date()}3`,
//         category: "Science",
//         source: {
//           name: "Info 24",
//           logo: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//           url: "http://localhost:5173/",
//           type: "newspaper",
//         },

//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToVideo: `c:\Users\iqbal\OneDrive\Desktop\Ho Gaya Hai Tujhko To Pyar Sajna MP3 Song Download - Dilwale Dulhania Le Jayenge.mp4`,
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `গৃহকর্মী নির্যাতনের অভিযোগে বিমান বাংলাদেশ এয়ারলাইনসের ব্যবস্থাপনা পরিচালককে স্ত্রীসহ গ্রেফতার করেছে পুলিশ। টিআইবি তাদের সবশেষ প্রতিবেদনে জানিয়েছে, ত্রয়োদশ জাতীয় সংসদ নির্বাচনের তফসিল ঘোষণার ৩৬ দিনের মধ্যে দেশে অন্তত ১৫ জন রাজনৈতিক কর্মী নিহত হয়েছেন। বাংলাদেশে আরো বেড়েছে এলপি গ্যাসের দাম। সবশেষ খবর জানতে চোখ রাখুন `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         SEO: {
//           metaTitle:
//             "হালকা চোট কাটিয়ে একাদশে ফিরেই একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//           metaDescription:
//             "র রীতিমতো তাণ্ডব চালালেন একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//           focusKeyword:
//             "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//           score: 49,
//         },
//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//     ],
//   });
// }
// export const letestCategory = async (req, res) => {
//   const category = req.params.category

//   res.json({
//     status: "ok",
//     success: true,
//     totalResults: 4742,


//     articles: [
//       {
//         category: category,
//         media: [
//           {
//             type: "cover",
//             url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           }
//         ],
//         id: new Date(),
//         source: {
//           logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           , id: "lasetProdact123",
//           name: "Internet",
//           url: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         category: "Sport",
//         media: [
//           {
//             type: "cover",
//             url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           }
//         ],
//         id: new Date(),
//         source: {
//           logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           , id: "lasetProdact123",
//           name: "Internet",
//           url: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         category: "Sport",
//         media: [
//           {
//             type: "cover",
//             url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           }
//         ],
//         id: new Date(),
//         source: {
//           logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           , id: "lasetProdact123",
//           name: "Internet",
//           url: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         category: "Sport",
//         media: [
//           {
//             type: "cover",
//             url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           }
//         ],
//         id: new Date(),
//         source: {
//           logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           , id: "lasetProdact123",
//           name: "Internet",
//           url: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         category: "Sport",
//         media: [
//           {
//             type: "cover",
//             url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           }
//         ],
//         id: new Date(),
//         source: {
//           logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//           , id: "lasetProdact123",
//           name: "Internet",
//           url: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },




//       {
//         id: `${new Date()}ew3`,
//         category: "UK",
//         source: {
//           id: "lasetProdact123",
//           name: "Internet",
//           category: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         id: `${new Date()}35`,
//         category: "Politics",
//         source: {
//           id: "lasetProdact123",
//           name: "Internet",
//           category: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         id: `${new Date()}34`,
//         category: "Sport",
//         source: {
//           id: "lasetProdact123",
//           name: "Internet",
//           category: "Business",
//         },
//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//         metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//         focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//       {
//         id: `${new Date()}3`,
//         category: "Science",
//         source: {
//           name: "Info 24",
//           logo: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//           url: "http://localhost:5173/",
//           type: "newspaper",
//         },

//         author: "info@thehackernews.com (The Hacker News)",
//         title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//         description:
//           "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//         url: "/Details",
//         urlToVideo: `c:\Users\iqbal\OneDrive\Desktop\Ho Gaya Hai Tujhko To Pyar Sajna MP3 Song Download - Dilwale Dulhania Le Jayenge.mp4`,
//         urlToImage:
//           "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//         publishedAt: new Date(),
//         content: `গৃহকর্মী নির্যাতনের অভিযোগে বিমান বাংলাদেশ এয়ারলাইনসের ব্যবস্থাপনা পরিচালককে স্ত্রীসহ গ্রেফতার করেছে পুলিশ। টিআইবি তাদের সবশেষ প্রতিবেদনে জানিয়েছে, ত্রয়োদশ জাতীয় সংসদ নির্বাচনের তফসিল ঘোষণার ৩৬ দিনের মধ্যে দেশে অন্তত ১৫ জন রাজনৈতিক কর্মী নিহত হয়েছেন। বাংলাদেশে আরো বেড়েছে এলপি গ্যাসের দাম। সবশেষ খবর জানতে চোখ রাখুন `,
//         summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//         SEO: {
//           metaTitle:
//             "হালকা চোট কাটিয়ে একাদশে ফিরেই একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//           metaDescription:
//             "র রীতিমতো তাণ্ডব চালালেন একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//           focusKeyword:
//             "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//           score: 49,
//         },
//         likes: {
//           totalLikes: 53,
//           likes: false,
//         },
//         share: {
//           totalShare: 33,
//           urlToShare: "",
//         },
//         comments: {
//           totalComments: 458983,
//         },
//       },
//     ],
//   });
// }



// import { Source, News, Media, User } from "./../Models/Model.js";


// export const Create = () => {}
// export const Update = () => { }
// export const Delete = () => { }
// export const GetSingle = () => { }

// export const GetAll = (req, res) => {
//     res.json({
//         status: "ok",
//         success: true,
//         totalResults: 4742,


//         articles: [
//             {
//                 category: "Business",
//                 media: [
//                     {
//                         type: "cover",
//                         url: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//                     }
//                 ],
//                 id: new Date(),
//                 source: {
//                     logoToUrl: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100"
//                     , id: "lasetProdact123",
//                     name: "Internet",
//                     url: "Business",
//                 },
//                 author: "info@thehackernews.com (The Hacker News)",
//                 title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//                 description:
//                     "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//                 url: "/Details",
//                 urlToImage:
//                     "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//                 publishedAt: new Date(),
//                 content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//                 summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//                 metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//                 metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//                 focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//                 likes: {
//                     totalLikes: 53,
//                     likes: false,
//                 },
//                 share: {
//                     totalShare: 33,
//                     urlToShare: "",
//                 },
//                 comments: {
//                     totalComments: 458983,
//                 },
//             },




//             {
//                 id: `${new Date()}ew3`,
//                 category: "UK",
//                 source: {
//                     id: "lasetProdact123",
//                     name: "Internet",
//                     category: "Business",
//                 },
//                 author: "info@thehackernews.com (The Hacker News)",
//                 title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//                 description:
//                     "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//                 url: "/Details",
//                 urlToImage:
//                     "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//                 publishedAt: new Date(),
//                 content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//                 summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//                 metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//                 metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//                 focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//                 likes: {
//                     totalLikes: 53,
//                     likes: false,
//                 },
//                 share: {
//                     totalShare: 33,
//                     urlToShare: "",
//                 },
//                 comments: {
//                     totalComments: 458983,
//                 },
//             },
//             {
//                 id: `${new Date()}35`,
//                 category: "Politics",
//                 source: {
//                     id: "lasetProdact123",
//                     name: "Internet",
//                     category: "Business",
//                 },
//                 author: "info@thehackernews.com (The Hacker News)",
//                 title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//                 description:
//                     "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//                 url: "/Details",
//                 urlToImage:
//                     "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//                 publishedAt: new Date(),
//                 content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//                 summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//                 metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//                 metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//                 focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//                 likes: {
//                     totalLikes: 53,
//                     likes: false,
//                 },
//                 share: {
//                     totalShare: 33,
//                     urlToShare: "",
//                 },
//                 comments: {
//                     totalComments: 458983,
//                 },
//             },
//             {
//                 id: `${new Date()}34`,
//                 category: "Sport",
//                 source: {
//                     id: "lasetProdact123",
//                     name: "Internet",
//                     category: "Business",
//                 },
//                 author: "info@thehackernews.com (The Hacker News)",
//                 title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//                 description:
//                     "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//                 url: "/Details",
//                 urlToImage:
//                     "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//                 publishedAt: new Date(),
//                 content: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।
// শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে সাঞ্জু স্যামসনকে হারানোর পর তিন নম্বরে ক্রিজে আসেন কিষান। প্রথম ৫ বলে মাত্র ১ রান করা এই ব্যাটসম্যান লকি ফার্গুসনকে চার ও ছক্কা মেরে হাত খোলা শুরু করেন। ফিফটি পূর্ণ করতে ২৮ বল নিলেও পরের ১৪ বলেই পৌঁছে যান তিন অঙ্কের ঘরে। ৪৩ বলে ১০৩ রানের এই ইনিংসে ছিল ১০টি ছক্কা ও ৬টি চার।

// `,
//                 summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//                 metaTitle: "হালকা চোট কাটিয়ে একাদশে ফিরেই",
//                 metaDescription: "র রীতিমতো তাণ্ডব চালালেন",
//                 focusKeyword: "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে ",

//                 likes: {
//                     totalLikes: 53,
//                     likes: false,
//                 },
//                 share: {
//                     totalShare: 33,
//                     urlToShare: "",
//                 },
//                 comments: {
//                     totalComments: 458983,
//                 },
//             },
//             {
//                 id: `${new Date()}3`,
//                 category: "Science",
//                 source: {
//                     name: "Info 24",
//                     logo: "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//                     url: "http://localhost:5173/",
//                     type: "newspaper",
//                 },

//                 author: "info@thehackernews.com (The Hacker News)",
//                 title: "টি-টোয়েন্টি সিরিজে ছক্কার নতুন বিশ্ব রেকর্ড",
//                 description:
//                     "হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার ",
//                 url: "/Details",
//                 urlToVideo: `c:\Users\iqbal\OneDrive\Desktop\Ho Gaya Hai Tujhko To Pyar Sajna MP3 Song Download - Dilwale Dulhania Le Jayenge.mp4`,
//                 urlToImage:
//                     "https://asset.news24bd.tv/public/news_images/2026/01/23/thumbnails/1769161485-9ff11ba7859ea2d71ea52fe60df7ee67.jpg?w=828&q=100",
//                 publishedAt: new Date(),
//                 content: `গৃহকর্মী নির্যাতনের অভিযোগে বিমান বাংলাদেশ এয়ারলাইনসের ব্যবস্থাপনা পরিচালককে স্ত্রীসহ গ্রেফতার করেছে পুলিশ। টিআইবি তাদের সবশেষ প্রতিবেদনে জানিয়েছে, ত্রয়োদশ জাতীয় সংসদ নির্বাচনের তফসিল ঘোষণার ৩৬ দিনের মধ্যে দেশে অন্তত ১৫ জন রাজনৈতিক কর্মী নিহত হয়েছেন। বাংলাদেশে আরো বেড়েছে এলপি গ্যাসের দাম। সবশেষ খবর জানতে চোখ রাখুন `,
//                 summary: `হালকা চোট কাটিয়ে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর রীতিমতো তাণ্ডব চালালেন ইশান কিষান। সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে এই বাঁহাতি ওপেনারের বিধ্বংসী সেঞ্চুরি এবং সূর্যকুমার যাদবের ঝোড়ো ব্যাটিংয়ে ছক্কার বিশ্বরেকর্ড গড়েছে ভারত। কিষানের ৪২ বলের এই খুনে সেঞ্চুরি ভারতকে এনে দিয়েছে বড় সংগ্রহ।শনিবার (৩১ জানুয়ারি) থিরুভানান্থাপুরামে টস জিতে ব্যাটিংয়ে নেমে তৃতীয় ওভারে `,

//                 SEO: {
//                     metaTitle:
//                         "হালকা চোট কাটিয়ে একাদশে ফিরেই একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//                     metaDescription:
//                         "র রীতিমতো তাণ্ডব চালালেন একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//                     focusKeyword:
//                         "সিরিজের পঞ্চম ও শেষ টি-টোয়েন্টিতে একাদশে ফিরেই নিউজিল্যান্ডের বোলারদের ওপর ",
//                     score: 49,
//                 },
//                 likes: {
//                     totalLikes: 53,
//                     likes: false,
//                 },
//                 share: {
//                     totalShare: 33,
//                     urlToShare: "",
//                 },
//                 comments: {
//                     totalComments: 458983,
//                 },
//             },
//         ],
//     });
// }




