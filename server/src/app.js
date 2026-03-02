import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
// Config files
import "./config/env.js";
import "./config/db.js";



//  ES Modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Socket.io
import socket from "./socket.js";

// Error handlers
import {commonErrorHandler , notFound }from "./Middleware/errorHender.js";

// API Routes
// import OpenAI from "./routes/OpenAI.js";
import Auth from "./routes/Auth.js";
import Comment from "./routes/Comment.js";
import Like from "./routes/Like.js";
import Share from "./routes/Share.js";
import Article from "./routes/Article.js";
import Media from "./routes/Media.js";
import Source from "./routes/Source.js";






// Initialize app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://bbcnews21.onrender.com"

    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Media uploads
app.use("/upload", express.static(path.join(__dirname, "../upload")));
app.use(express.static(path.join(__dirname, "../../client/dist")));


// ES Modules __dirname fix
app.use((req, res, next) => {
  res.locals.__dirname = __dirname;
  next();
});

// app.use("/OpenAI", OpenAI);
// 1️⃣ API routes (must come before React catch-all)
app.use("/Auth/User", Auth);
app.use("/Comments", Comment);
app.use("/Likes", Like);
app.use("/Share", Share);
app.use("/Articles", Article);
app.use("/Media", Media);
app.use("/Source", Source);
// 2️⃣ Serve React build static files

// 3️⃣ Test route
app.get("/headline", (req, res) => {
  setTimeout(() => {
    res.json([
      { message: "adoption, marking a pivotal moment in global" },
      { message: "adoption, marking a pivotal moment in global" },
      { message: "adoption, marking a pivotal moment in global" },
    ]);
  }, 2000);
});



// ✅ React SPA fallback LAST
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

socket(server);

// 6️⃣ Error handlers
app.use(notFound);
app.use(commonErrorHandler);

export default server;
