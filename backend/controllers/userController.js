const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect Email or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Email or Password", status: false });
    delete user.password;
    const data = {
      user : {
          id : user.id
      }
  }
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    return res.json({ status: true, authToken });
  } catch (ex) {
    next(ex);
  }
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    const data = {
      user : {
          id : user.id
      }
  }
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    return res.json({ status: true, authToken });
  } catch (ex) {
    next(ex);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (ex) {
    next(ex);
  }
};

module.exports = {login, register, getUserById};