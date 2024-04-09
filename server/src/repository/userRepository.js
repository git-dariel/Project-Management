const User = require('../models/userModel')

const getUser = async (id) => {
  try {
    return await User.findById(id)
  } catch (error) {
    return error
  }
}

const getUsers = async () => {
  try {
    return await User.find()
  } catch (error) {
    return error
  }
}

const findByEmail = async (email) => {
  try {
    return await User.findOne({email: email})
  } catch (error) {
    return error
  }
}

const createUser = async (data) => {
  try {
    let user = await User.create(data)
    user = await User.findById(user.id).select('-password')
    return user
  } catch (error) {
    return error
  }
}

const updateUser = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(id, data, { new: true })
  } catch (error) {
    return error
  }
}

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id)
  } catch (error) {
    return error
  }
}

const userRepository = {
  getUser: getUser,
  getUsers: getUsers,
  findByEmail: findByEmail,
  createUser: createUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
}

module.exports = userRepository
