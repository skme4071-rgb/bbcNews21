
import multer from "multer";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadDir = path.join(__dirname, "./../../../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const safeName =
            Date.now() +
            "-" +
            file.originalname.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");
        cb(null, safeName);
    },
});
export const createUploaderArray = (
    maxCount = 1,
    { accept = "all", size = 50 * 1024 * 1024 } = {}
) => {
    return (req, res, next) => {



        const fileFilter = (req, file, cb) => {
            const mime = file.mimetype;
            const validTypes = {
                image: mime.startsWith("image/"),
                video: mime.startsWith("video/"),
                audio: mime.startsWith("audio/"),
                pdf: mime === "application/pdf",
                all: true
            };

            if (!validTypes.hasOwnProperty(accept)) {
                return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid accept config"));
            }

            if (!validTypes[accept]) {
                return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type"));
            }

            cb(null, true);
        };

        const upload = multer({ storage, limits: { fileSize: size }, fileFilter }).array("file", maxCount);

        upload(req, res, (err) => {
            if (err) return next(err); // Pass error to common handler
            next(); // Success → Continue to controller
        });
    };
};

export const createUploaderfields = (
    fields = []
) => {
    return (req, res, next) => {

        const fileFilter = (req, file, cb) => {



            // Find field config
            const fieldConfig = fields.find(f => f.name === file.fieldname);

            if (!fieldConfig) {
                return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
            }

            const { accept = "all" } = fieldConfig;

            const mime = file.mimetype;

            const validTypes = {
                image: mime.startsWith("image/"),
                video: mime.startsWith("video/"),
                audio: mime.startsWith("audio/"),
                pdf: mime === "application/pdf",
                all: true
            };

            if (!validTypes[accept]) {
                return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
            }

            cb(null, true);
        };

        const upload = multer({
            storage,
            fileFilter
        }).fields(
            fields.map(({ name, maxCount }) => ({ name, maxCount }))
        );

        upload(req, res, (err) => {

            if (err) return next(err);

            // Field-wise file size validation
            for (const field of fields) {

                const uploadedFiles = req.files?.[field.name];

                if (!uploadedFiles) continue;

                for (const file of uploadedFiles) {
                    if (field.size && file.size > field.size) {
                        return next(
                            new multer.MulterError("LIMIT_FILE_SIZE", field.name)
                        );
                    }
                }
            }

            next();
        });
    };
};


// 🔥 F ile cleanup if uploaded
export const fileCleanupArray = async (req) => {
    if (!req.files || req.files.length === 0) return;

    for (const file of req.files) {
        const filePath = path.join(uploadDir, file.filename);
        await fsPromises.unlink(filePath).catch((err) => {
            console.log("Failed to delete file:", filePath, err?.message || "");
        });
    }

    return
};


export const fileCleanupFields = async (req) => {

    if (!req.files) return;

    const files = Object.keys(req.files).flatMap((key) => req.files[key]);

    for (const file of files) {

        const filePath = path.join(uploadDir, file.filename);

        try {
            await fsPromises.unlink(filePath);
        } catch (err) {
            console.log("Failed to delete file:", filePath, err?.message || "");
        }

    }

};


