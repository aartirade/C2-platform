const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
  },

  avatar: {
    public_id: String,
    url: String,
  },

  // New Changes

  prn_no: {
    type: String,
    required: true,
  },
  instituteCode: {
    type: Number,
    required: true,
  },
  departmentCode: {
    type: String,
    required: true,
  },
  gfg_easy: {
    type: Number,
    required: false,
  },
  gfg_med: {
    type: Number,
    required: false,
  },
  gfg_hard: {
    type: Number,
    required: false,
  },
  leet_easy: {
    type: Number,
    required: false,
  },
  leet_med: {
    type: Number,
    required: false,
  },
  leet_hard: {
    type: Number,
    required: false,
  },
  github_commit_count: {
    type: Number,
    required: false,
  },
  linkedin_internship_count: {
    type: Number,
    required: false,
  },
  hackerrank_all_sum_count: {
    type: Number,
    required: false,
  },

  mobile_no: {
    type: Number,
    required: false,
  },

  // This is ref

  institute: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Institute",
    },
  ],

  department: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  ],

  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
