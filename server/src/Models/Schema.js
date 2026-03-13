import mongoose from "mongoose";
import bcrypt from "bcryptjs";


// =================== Media Schema ===================
export const mediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "video", "audio", "application"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    cloudId: String,
    size: Number,
    mimeType: String,
    purpose: {
      type: String,
      enum: ["cover", "gallery", "thumbnail", "logo", "banner"],
      default: "gallery",
    },
    filename: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);




// =================== News Schema ===================
export const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    description: { type: String, trim: true, maxlength: 500 },
    summary: { type: String, trim: true, maxlength: 500 },



    author: { type: String, required: true },
    category: { type: String, required: true },

    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      required: true,
    },

    media: [
      {
        type: mediaSchema,

      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tags: [String],

    publishedAt: Date,

    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

newsSchema.pre("save", function () {
  if (this.state === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});


// =================== Source Schema ===================
export const sourceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    url: { type: String, required: true },


    media: {
      type: mediaSchema,
      required: true,
    },
    urlTologo: { type: String, required: true },
    type: {
      type: String,
      enum: ["newspaper", "tv", "blog", "agency", "social"],
      default: "newspaper",
      unique: true,
    },

    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "editor",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);



// =================== User Schema ===================
export const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/,
    },

    // ✅ FIXED: user media should reference Media
    media: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Media",
      }
    ],

    passwordHash: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: ["reporter", "editor", "manager", "user", "admin"],
      default: "user",
    },

    isActive: { type: Boolean, default: true },
    lastLogin: Date,
  },
  { timestamps: true }
);

// 🔐 Hash password
userSchema.pre("save", async function () {
  if (this.isModified("passwordHash")) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
});

// 🔁 Compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};
