import express from "express";
import mongoose from "mongoose";
import SemesterItem from "./semesterModel.js";

const router = express.Router();

export const getSemesters = async (req, res) => {
  try {
    const semesterList = await SemesterItem.find();

    res.status(200).json(semesterList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSemester = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const semesterItem = await SemesterItem.findById(id);

    res.status(200).json(semesterItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSemester = async (req, res) => {
  const { term, year, Courses_list} = req.body;
  console.log(term + " " + year);
  const newSemesterItem = new SemesterItem({
    term,
    year,
    Courses_list
  });

  try {
    await newSemesterItem.save();

    res.status(201).json(newSemesterItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateSemester = async (req, res) => {
  const { id } = req.params;
  const { term, year, Courses_list } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedSemester = { term, year, Courses_list, _id: id };

  await SemesterItem.findByIdAndUpdate(id, updatedSemester, { new: true });

  res.json(updatedSemester);
  console.log("updated semester: ", updatedSemester);
};

export const deleteSemester = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await SemesterItem.findByIdAndRemove(id);

  res.json({ message: "Semester deleted successfully." });
};

export default router;