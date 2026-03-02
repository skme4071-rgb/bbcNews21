// import express from "express";
// import fs from "fs";
// import multer from "multer";

// import path from "path";
// import { Media } from "../Models/models.js";
// import { LoginCheck } from "../Middleware/commonMiddleware.js";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Upload Folder (main uploads)
// const uploadDir = path.join(__dirname, "../../upload");

// // Folder auto-create
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }
// const router = express.Router();
// // ===== Multer setup =====
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         file.type;
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         const safeName =
//             Date.now() +
//             "-" +
//             file.originalname
//                 .replace(/\s+/g, "_")
//                 .replace(/,/g, "")
//                 .replace(/[^\w.-]/g, "");

//         cb(null, safeName);
//     },
// });

// const upload = multer({ storage });

// // ===== GET all media =====
// router.get("/", LoginCheck, async (req, res) => {
//     try {
//         const media = await Media.find();
//         res.json(media);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// // ===== POST upload media =====
// router.post("/", LoginCheck, upload.single("file"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No file received" });
//         }

//         const fileType = req.file.mimetype.startsWith("video") ? "video" : "image";

//         const media = new Media({
//             type: fileType,
//             url: `${process.env.APP_URL}${process.env.PORT}/upload/${req.file.filename}`,
//             cloudId: "",
//             size: req.file.size,
//             mimeType: req.file.mimetype,
//             createdBy: req.user.id,
//             fileName: req.file.filename
//         });

//         await media.save();
//         res.json(media);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ===== PUT update media =====
// router.put("/:id", async (req, res) => {
//     try {
//         const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//         });
//         res.json(media);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // ===== DELETE media =====
// router.delete("/:id", LoginCheck, async (req, res) => {
//     try {
//         await Media.findByIdAndDelete(req.params.id);
//         res.json({ message: "Media deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// export default router;




import express from "express";
import { Create, Update, Delete, GetSingle, GetAll } from "../controllers/Media.js";

import { LoginCheck, accessRole } from "../Middleware/commonMiddleware.js";

const router = express.Router();

// ================= MIDDLEWARE =================
router.use(LoginCheck);

// ================= CRUD ROUTES =================



// Create
router.post("/", Create);
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