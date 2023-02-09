import express from "express";
import mongoose from "mongoose";
import CreditsItem from "./creditsModel.js";

const router = express.Router();

export const getCredits = async (req, res) => {
  try {
    const creditsList = await creditsItem.find();

    res.status(200).json(creditsList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCredits = async (req, res) => {
  const { credits_count, category} = req.body;
  console.log(credits_count + " " + category);
  const newCreditsItem = new CreditsItem({
    credits_count,
    category,
  });

  try {
    await newCreditsItem.save();

    res.status(201).json(newCreditsItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCredits = async (req, res) => {
  const { id } = req.params;
  const { credits_count, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedCredits = { credits_count, category, _id: id };

  await CreditsItem.findByIdAndUpdate(id, updatedCredits, { new: true });

  res.json(updatedCredits);
  console.log("updated credits: ", updatedCredits);
};

export const deleteCredits = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await CreditsItem.findByIdAndRemove(id);

  res.json({ message: "Credits deleted successfully." });
};

export default router;