const asyncHandler = require("express-async-handler");
const User = require("../../models/user-model");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

const addUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, position, email, password } = req.body;
  if (!firstname || !lastname || !position || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  } else {
    const user = await User.create({
      firstname,
      lastname,
      position,
      email,
      password,
    });
    res.status(201).json({ user });
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json({ user });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: `Update success`, user: updatedUser });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Delete success`, user: deletedUser });
  }
});

module.exports = { getUsers, addUser, getUser, updateUser, deleteUser };
