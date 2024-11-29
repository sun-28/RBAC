const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists " });
  }
  const user = new User({
    username,
    password: hashedPassword,
    role: role || "guest",
  });
  await user.save();
  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = { id: user._id, role: user.role };
    return res.json({ message: "Logged in" });
  }
  res.status(401).json({ message: "Invalid credentials" });
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.json({ message: "Logged out" }));
};
