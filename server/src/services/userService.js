const asyncHandler = require('express-async-handler');
const userRepository = require('../repository/userRepository');
const { trimAll } = require('../config/commonConfig');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const saltFactor = 10;

const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await userRepository.getUser(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  try {
    const { firstname, lastname, role, email, password } = trimmedBody;
    if (!firstname || !lastname || !role || !email || !password) {
      throw new Error('All fields are mandatory!');
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    const userAvailable = await userRepository.findByEmail(email);
    if (userAvailable) {
      throw new Error('User already registered!');
    }

    const hashedPassword = await bcrypt.hash(password, saltFactor);

    let user = await userRepository.createUser({
      firstname,
      lastname,
      role,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400);
    throw error;
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password, ...otherUpdates } = trimmedBody;

    if (email && !validator.isEmail(email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }

    let updates = { ...otherUpdates };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    if (email) updates.email = email;

    const updatedUser = await userRepository.updateUser(req.params.id, updates);

    if (!updatedUser) {
      res.status(400);
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({ message: 'Update successful', user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during the update.', error: error.message });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await userRepository.getUser(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }
    const deletedUser = await userRepository.deleteUser(req.params.id);
    res.status(200).json({ message: 'Delete successful', user: deletedUser });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.getUsers();
  res.status(200).json(users);
});

const loginUser = asyncHandler(async (req, res) => {
  const trimmedBody = trimAll(req.body);
  try {
    const { email, password } = trimmedBody;
    if (!email || !password) {
      throw new Error('Both email and password are required.');
    }

    const user = await userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { user: { id: user.id, email: user.email, role: user.role } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

const currentUser = asyncHandler(async (req, res) => {
  try {
    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized access. No user found.');
    }
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: error.message });
  }
});

const userService = {
  registerUser: registerUser,
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getUsers: getUsers,
  loginUser: loginUser,
  currentUser: currentUser,
};

module.exports = userService;
