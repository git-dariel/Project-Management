const asyncHandler = require("express-async-handler");
const User = require("../../models/user-model");
const bcrypt = require("bcrypt");

//*desc Register a user
//*route POST /api/users/register
//*access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, position, email, password } = req.body;
  if (!firstname || !lastname || !position || !email || !password) {
    res.status(400);
    throw new Error("Missing required fields");
  } else {
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = await User.create({
        firstname,
        lastname,
        position,
        email,
        password: hashedPassword,
      });

      console.log(user);
      if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
      } else {
        res.status(404);
        throw new Error("User data is not valid");
      }
    }
  }
});

//*desc Get the user
//*route GET /api/users/:id
//*access public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.status(200).json({ user });
  }
});

//*desc Update the user
//*route PUT /api/users/:id
//*access public
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

//*desc Delete the user
//*route DELETE /api/users/:id
//*access public
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

module.exports = { registerUser, getUser, updateUser, deleteUser };
