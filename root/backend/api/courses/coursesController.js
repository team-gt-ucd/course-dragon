import express from "express";
import mongoose from "mongoose";
import CoursesItem from "./coursesModel.js";

const router = express.Router();

export const getCourses = async (req, res) => {
  try {
    const coursesList = await coursesItem.find();

    res.status(200).json(coursesList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCourses = async (req, res) => {
  const { course_code, course_title, course_description, Credits, credits_taken, prerequisites_list, instructorScores_list} = req.body;
  console.log(course_code + " " + course_title);
  const newCoursesItem = new CoursesItem({
    course_code,
    course_title,
    course_description,
    Credits,
    credits_taken,
    prerequisites_list,
    instructorScores_list
  });

  try {
    await newCoursesItem.save();

    res.status(201).json(newCoursesItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCourses = async (req, res) => {
  const { id } = req.params;
  const { course_code, course_title,course_description,Credits,credits_taken,prerequisites_list,instructorScores_list} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedCourses = { course_code, course_title,course_description,Credits,credits_taken,prerequisites_list,instructorScores_list, _id: id };

  await CoursesItem.findByIdAndUpdate(id, updatedCourses, { new: true });

  res.json(updatedCourses);
  console.log("updated courses: ", updatedCourses);
};

export const deleteCourses = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await CoursesItem.findByIdAndRemove(id);

  res.json({ message: "Courses deleted successfully." });
};

export default router;