const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    // Basic info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ownerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true, // one school per owner email (optional but helpful)
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    logoUrl: {
      type: String,
      default: "",
    },

    // Approval / account state
    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "SUSPENDED"],
      default: "PENDING",
    },

    // Subscription / plan
    planKey: {
      type: String,
      enum: ["FREE", "STARTER", "PRO"],
      default: "FREE",
    },

    subscription: {
      isActive: {
        type: Boolean,
        default: false,
      },
      expiresAt: {
        type: Date,
        default: null,
      },
      lastPaymentAt: {
        type: Date,
        default: null,
      },
    },

    // Optional: security control (allow only certain devices/IPs later)
    allowedIps: {
      type: [String],
      default: [],
    },

    // Optional: quick metrics (can be calculated instead, but cached here if you want)
    stats: {
      studentCount: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("School", schoolSchema);