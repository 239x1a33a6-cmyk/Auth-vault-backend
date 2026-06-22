const User = require("../models/userModel");
async function getAllUsers(req, res) {
  try {
    const users = await User.find({}).select("-password");
    if (users.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users registerd!!",
        users: users,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}
async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id).select(
      "-password",
    );
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with this ID",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
      user: deletedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}
module.exports = {
  getAllUsers,
  deleteUser,
};
