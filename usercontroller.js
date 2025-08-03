const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Get all users (excluding password)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, __v: 0 });
    res.status(200).json({ status: "success", length: users.length, data: { users } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// Signup
const signup = async (req, res) => {
  try {
    let { password, confirmPassword, name, email, role, phone } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ status: "fail", message: "Passwords do not match" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "fail", message: "User already exists" });
    }
    password = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password, role, phone });
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
    res.status(201).json({ status: "success", token, data: { user } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: `Error in Sign up ${error.message}` });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "fail", message: "Email or Password is missing" });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ status: "fail", message: "User not exists" });
  }
  const matchedPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchedPassword) {
    return res.status(401).json({ status: "fail", message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { id: existingUser._id, name: existingUser.name, role: existingUser.role },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
  return res.status(200).json({
    status: "success",
    token,
    data: { user: { name: existingUser.name, email, role: existingUser.role } },
  });
};

// Protect routes middleware
const protectRoutes = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ status: "fail", message: "You are not logged in" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.userId = decodedToken.id;
    req.userRole = decodedToken.role;
    next();
  } catch (error) {
    res.status(401).json({ status: "fail", message: error.message });
  }
};

// Add book to favorites
const addBookToFav = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookId } = req.body;
    if (!bookId) {
      return res.status(400).json({ status: "fail", message: "Book ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }
    if (!user.favBooks) user.favBooks = [];
    if (!user.favBooks.includes(bookId)) {
      user.favBooks.push(bookId);
      await user.save();
    }
    res.status(200).json({ status: "success", data: { favBooks: user.favBooks } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

module.exports = { signup, getAllUsers, login, protectRoutes, addBookToFav };