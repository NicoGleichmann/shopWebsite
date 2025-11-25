// backend/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // NEUE FELDER FÜR DOUBLE OPT-IN
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationToken: { 
    type: String 
  },
  cart: {
    type: Array,
    default: []
  }
});

export const User = mongoose.model("User", userSchema);