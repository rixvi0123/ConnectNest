const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asynchandler(async (req, res) => {
  const { username, email, password, resetHint, resetKey } = req.body;

  if (!username || !email || !password || !resetHint || !resetKey) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedResetKey = await bcrypt.hash(resetKey, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    resetHint,
    resetKeyHash: hashedResetKey,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

// @desc Get current user
// @route GET /api/users/current
// @access Private
const currentUser = asynchandler(async (req, res) => {
  res.json(req.user);
});

// @desc Get reset hint
// @route POST /api/users/reset/request
// @access Public
const getResetHint = asynchandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ resetHint: user.resetHint });
});

// @desc Verify reset key and change password
// @route POST /api/users/reset/verify
// @access Public
const verifyResetAndChangePassword = asynchandler(async (req, res) => {
  const { email, resetKey, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(resetKey, user.resetKeyHash);
  if (!isMatch) {
    res.status(401);
    throw new Error("Reset key is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password successfully updated" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
  getResetHint,
  verifyResetAndChangePassword,
};
