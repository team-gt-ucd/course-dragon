import express from "express";
import mongoose from "mongoose";
import DegreeMapItem from "./degreeMapModel.js";

const router = express.Router();

export const getDegreeMaps = async (req, res) => {
  try {
    const degreeMapList = await DegreeMapItem.find();

    res.status(200).json(degreeMapList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDegreeMap = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const degreeMapItem = await DegreeMapItem.findById(id);

    res.status(200).json(degreeMapItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createDegreeMap = async (req, res) => {
  const { major, catalog_year, total_credits_needed, credits_needed_by_category, Semester_list } = req.body;
  console.log(major + " " + catalog_year);
  const newDegreeMapItem = new DegreeMapItem({
    major,
    catalog_year,
    total_credits_needed,
    credits_needed_by_category,
    Semester_list,
  });

  try {
    await newDegreeMapItem.save();

    res.status(201).json(newDegreeMapItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateDegreeMap = async (req, res) => {
  const { id } = req.params;
  const { major, catalog_year, total_credits_needed, credits_needed_by_category, Semester_list } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedDegreeMap = { major, catalog_year, total_credits_needed, credits_needed_by_category, Semester_list, _id: id };

  await DegreeMapItem.findByIdAndUpdate(id, updatedDegreeMap, { new: true });

  res.json(updatedDegreeMap);
  console.log("updated degree map ", updatedDegreeMap);
};

export const deleteDegreeMap = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await DegreeMapItem.findByIdAndRemove(id);

  res.json({ message: "Degree Map deleted successfully." });
};

export default router;