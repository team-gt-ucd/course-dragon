import express from "express";
import mongoose from "mongoose";
import instructorScoresItem from "./instructorScoresModel.js";

const router = express.Router();

export const getInstructorScores = async (req, res) => {
  try {
    const InstructorScoreList = await instructorScoresItem.find();

    res.status(200).json(InstructorScoresList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInstructorScores = async (req, res) => {
  const { instructor, course, average_rating} = req.body;
  console.log(instructor + " " + course + " " + average_rating);
  const newinstructorScores = new instructorScoresItem({
    instructor,
    course,
    average_rating,
  });

  try {
    await newInstructorScoresItem.save();

    res.status(201).json(newInstructorScoreItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInstructorScores = async (req, res) => {
  const { id } = req.params;
  const { instructor, course, average_rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedInstructorScore = { instructor, course, average_rating, _id: id };

  await InstructorScoreItem.findByIdAndUpdate(id, updatedInstructorScore, { new: true });

  res.json(updatedInstructorScore);
  console.log("updated instructor score: ", updatedInstructorScore);
};

export const deleteInstructorScores = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await InstructorScoreItem.findByIdAndRemove(id);

  res.json({ message: "Inmstructor score deleted successfully." });
};

export default router;