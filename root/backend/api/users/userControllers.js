import express from "express";
import mongoose from "mongoose";
import UserItem from "./userModels.js";

const router = express.Router();

export const getUsers = async (req, res) => {
  try {
    const userList = await UserItem.find();

    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const userItem = await UserItem.findById(id);

    res.status(200).json(userItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password_hash, account_type, Degree_map_list } = req.body;
  console.log("User created: ", username);
  const newUserItem = new UserItem({
    username,
    password_hash,
    account_type,
    Degree_map_list,
  });

  try {
    await newUserItem.save();

    res.status(201).json(newUserItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password_hash, account_type, Degree_map_list } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedUser = { username, password_hash, account_type, Degree_map_list, _id: id };

  await UserItem.findByIdAndUpdate(id, updatedUser, { new: true });

  res.json(updatedUser);
  console.log("Updated User: ", updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await UserItem.findByIdAndRemove(id);

  res.json({ message: "User deleted successfully." });
};

export default router;