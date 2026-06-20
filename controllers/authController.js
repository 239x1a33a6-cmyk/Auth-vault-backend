async function handleRegister(req, res) {
  return res.status(201).json({
    success: true,
    message: "User register successfully ",
  });
}

async function handleLogin(req, res) {
  return res.status(200).json({
    success: true,
    message: "User register successfully ",
  });
}

module.exports = {
  handleRegister,
  handleLogin,
};
