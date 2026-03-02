// import express from "express";

// import {LoginCheck} from "./../Middleware/commonMiddleware.js"
// import { articlesCreate, allLetestArticles, letestCategory } from "../controllers/articlesControllers.js";

// const router = express.Router();

// router.post("/", LoginCheck  , articlesCreate);

// router.get("/:category", letestCategory)

// router.get("/", allLetestArticles);



// export default router;


import express from "express";
import { Create, Update, Delete, GetSingle, GetAll } from "../controllers/Article.js";
import { LoginCheck, accessRole } from "../Middleware/commonMiddleware.js";
import { createUploaderfields } from "./../Middleware/multer.js";


const router = express.Router();

// ================= MIDDLEWARE =================


// ================= CRUD ROUTES =================


// Create
router.post(
    "/",
    createUploaderfields([
        { name: "newsImage", maxCount: 1, accept: "image", size: 10 * 1024 * 1024 },
        { name: "newsVideo", maxCount: 1, accept: "video", size: 100 * 1024 * 1024 },
        { name: "newsAudio", maxCount: 1, accept: "audio", size: 10 * 1024 * 1024 }
    ]),
    Create
);
// Update
router.put("/:id", accessRole(["editor", "admin"]), Update);
// Delete
router.delete("/:id", accessRole(["admin"]), Delete);

// Get all
router.get("/", GetAll);
// ================= LATEST ARTICLES =================
// Get single
router.get("/:id", GetSingle);

export default router;