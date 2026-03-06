
// ============= Final Project Structure (Monorepo) ===================

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

// Config files
import "./config/env.js";



// ES Modules __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Development only clean terminal
// if (process.env.NODE_ENV === "development") process.stdout.write("\x1Bc");

// Socket.io
import socket from "./socket.js";

// Error handlers
import { commonErrorHandler, notFound } from "./Middleware/errorHender.js";

// API Routes
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
      "http://localhost:5174/",
      "https://bbcnews21.onrender.com",
      "http://localhost:5174"
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Media uploads
app.use("/upload", express.static(path.join(__dirname, "./../../uploads")));

// ✅ Serve static builds
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(
  "/Dashboard",
  express.static(path.join(__dirname, "../../dashboard/dist"))
);




// API Routes (must come before SPA fallback)
app.use("/Auth/User", Auth);
app.use("/Comments", Comment);
app.use("/Likes", Like);
app.use("/Share", Share);
app.use("/Articles", Article);
app.use("/Media", Media);
app.use("/Source", Source);

// Test route
app.get("/headline", (req, res) => {
  setTimeout(() => {
    res.json([
      { message: "adoption, marking a pivotal moment in global" },
      { message: "adoption, marking a pivotal moment in global" },
      { message: "adoption, marking a pivotal moment in global" },
    ]);
  }, 2000);
});


// 1️⃣ Dashboard SPA
app.get("/Dashboard/*rest", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../dashboard/dist/index.html")
  );
});

// 2️⃣ Client SPA
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});




// Socket.io
socket(server);

// Error handlers
app.use(notFound);
app.use(commonErrorHandler);

export default server;