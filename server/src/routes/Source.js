
import express from "express";
import { Create, Update, Delete, GetSingle, GetAll } from "../controllers/Source.js";
import { LoginCheck, accessRole } from "../Middleware/commonMiddleware.js";
import { createUploaderArray } from "./../Middleware/multer.js";


const router = express.Router();

// ================= MIDDLEWARE =================
router.use(LoginCheck);
router.use(accessRole(["admin", "editor"]))

// ================= CRUD ROUTES =================




// Create
router.post("/",
    createUploaderArray(1, { accept: "image", size: 50 * 1024 * 1024 }),
    Create
);
// Update
router.put("/:sourceType", Update);
// Delete
router.delete("/:sourceType", Delete);

// Get all
router.get("/", GetAll);
// ================= LATEST ARTICLES =================
// Get single
router.get("/:sourceType", GetSingle);

export default router;