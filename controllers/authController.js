const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

async function getProfile(req, res) {
  try {
    const { id } = req.user;
    // console.log(id);
    const user = await User.findOne({
      _id: id,
    }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
}

async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        sucess: false,
        message: "Enter required fields",
      });
    }

    const user = await User.findOne({
      email: email,
    });
    //Now we will get a user object

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this Credentials!",
      });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "User Logged In Successfully",
      Wish: `Welcome on board ${user.name}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

async function handleLogout(req, res) {
  const token = req.cookies.token;
  res.clearCookie("token");
  return res.status(200).json({
    success: true,
    message: "Logged out Successfully",
  });
}

module.exports = {
  handleRegister,
  handleLogin,
  getProfile,
  handleLogout,
};
