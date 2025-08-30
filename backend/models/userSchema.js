import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must contain at least 3 characters!"],
    maxlength: [30, "Name cannot exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [isEmail, "Please provide a valid email"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: [8, "Password must contain at least 8 characters!"],
    maxlength: [32, "Password cannot exceed 32 characters!"],
    select: false, // 👈 le mot de passe ne sort JAMAIS par défaut
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 🔐 Hash password avant sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Vérifie le mot de passe
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔐 Génère un JWT
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY, 
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );
};

export const User = mongoose.model("User", userSchema);
