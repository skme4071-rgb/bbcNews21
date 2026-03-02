
import express from "express";
import { Create, Update,  Delete, GetSingle, GetAll } from "../controllers/Share.js";

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