import multer from "multer";
import createError from "http-errors";

// 404 Not Found middleware
export const notFound = (req, res, next) => {
    next(createError(404, `${req.url} Route Not Found`));
};





export const commonErrorHandler = (err, req, res, next) => {

    // Multer errors
    if (err instanceof multer.MulterError) {
        let message = err.message;
        if (err.code === "LIMIT_FILE_SIZE") message = "File size exceeded limit";
        else if (err.code === "LIMIT_FILE_COUNT") message = "File count limit exceeded";
        else if (err.code === "LIMIT_UNEXPECTED_FILE") message = "Invalid file type or unexpected file";

        return res.status(400).json({ success: false, message });
    }

    // General errors
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    const response = { success: false, status, message };
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(status).json(response);
};

