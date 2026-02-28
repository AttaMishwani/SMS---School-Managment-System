const mongoose = require("mongoose");
const { compare } = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // null means SUPER_ADMIN
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "SCHOOL_ADMIN", "ACCOUNTANT", "TEACHER"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },


    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

userSchema.methods.comparePassword = async function (password) {
  if (typeof password !== "string") return false;
  const storedPassword = this.passwordHash || this.password;
  if (!storedPassword) return false;

  // Support existing legacy records that may have plain-text passwords.
  if (!storedPassword.startsWith("$2")) {
    return password === storedPassword;
  }

  return compare(password, storedPassword);
};



module.exports = mongoose.model("User", userSchema);
