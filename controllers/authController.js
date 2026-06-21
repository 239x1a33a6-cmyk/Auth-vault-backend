const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function handleRegister(req, res) {
  try {
    // 1. Validate request body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Request body is empty",
      });
    }

    // 2. Destructure and validate required fields
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, password",
      });
    }

    // 3. Validate email format (basic check)
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid email format",
    //   });
    // }

    // 4. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // 5. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 6. Create new user (use User model, not user variable)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 7. Return success response (don't send password back)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err); // Log for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}

async function handleLogin(req, res) {
  return res.status(200).json({
    success: true,
    message: "User Logged in successfully ",
  });
}

module.exports = {
  handleRegister,
  handleLogin,
};
