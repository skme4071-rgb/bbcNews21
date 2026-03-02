import mongoose from "mongoose";

import createError from "http-errors";
import path from "path";
import { fileURLToPath } from "url";

import { Source, User } from "./../Models/Model.js";
import { fileCleanup } from "./../Middleware/multer.js";


export const Create = async (req, res, next) => {
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
        const sourceType = req.params.sourceType;
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
        const sourceType = req.params.sourceType
        const userId = req.user.id
        const source = await Source.findOne({ type: sourceType }).session(session);
        if (!source) throw createError(404, "Source not found");

        if (!source.createdBy._id.equals(userId)) {
            throw createError(403, "Unauthorized access");
        }



        const mediaCleanup = { files: [source.media] }


        await Source.deleteOne({ type: source.type }).session(session);
        await fileCleanup(mediaCleanup);


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
        const sourceType = req.params.sourceType;

        const source = await Source.findOne({ type: sourceType }).sort({ createdAt: -1 }).limit(1);;;
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


