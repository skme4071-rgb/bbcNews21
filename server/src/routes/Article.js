

import express from "express";
import { Create, Update, Delete, GetSingle, GetAll } from "../controllers/Article.js";
import { LoginCheck, accessRole } from "../Middleware/commonMiddleware.js";
import { createUploaderfields } from "./../Middleware/multer.js";


const router = express.Router();




// ================= CRUD ROUTES ================

// Get all
router.get("/", GetAll);
// ================= LATEST ARTICLES =================
// Get single
router.get("/:id", GetSingle);



router.use(LoginCheck, accessRole(["admin", "editor"]));

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


export default router;