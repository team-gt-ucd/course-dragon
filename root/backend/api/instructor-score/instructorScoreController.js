import express from "express";
import mongoose from "mongoose";
import InstructorScoreItem from "./instructorScoreModel.js";

const router = express.Router();

export const getInstructorScores = async (req, res) => {
  try {
    const instructorScoreList = await InstructorScoreItem.find();

    res.status(200).json(instructorScoreList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInstructorScore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const instructorScoreItem = await InstructorScoreItem.findById(id);

    res.status(200).json(instructorScoreItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createInstructorScore = async (req, res) => {
  const { instructor, course_subject, course_code, average_rating} = req.body;
  console.log(instructor + " " + course_subject + " " + course_code + " " + average_rating);
  const newInstructorScoreItem = new InstructorScoreItem({
    instructor,
    course_subject,
    course_code,
    average_rating,
  });

  try {
    await newInstructorScoreItem.save();

    res.status(201).json(newInstructorScoreItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateInstructorScore = async (req, res) => {
  const { id } = req.params;
  const { instructor, course_subject, course_code, average_rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedInstructorScore = { instructor, course_subject, course_code, average_rating, _id: id };

  await InstructorScoreItem.findByIdAndUpdate(id, updatedInstructorScore, { new: true });

  res.json(updatedInstructorScore);
  console.log("updated instructor score: ", updatedInstructorScore);
};

export const deleteInstructorScore = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await InstructorScoreItem.findByIdAndRemove(id);

  res.json({ message: "Instructor score deleted successfully." });
};

export default router;