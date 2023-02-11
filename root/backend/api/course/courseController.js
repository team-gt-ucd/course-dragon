import express from "express";
import mongoose from "mongoose";
import CourseItem from "./courseModel.js";

const router = express.Router();

export const getCourses = async (req, res) => {
  try {
    const courseList = await CourseItem.find();

    res.status(200).json(courseList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    const courseItem = await CourseItem.findById(id);

    res.status(200).json(courseItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  const { term, year, course_subject, course_code, course_title, course_description, Credits, taken, prerequisites_list, Instructor_score_list } = req.body;
  console.log(course_subject + " " + course_code + ": " + course_title);
  const newCourseItem = new CourseItem({
    term,
    year,
    course_subject,
    course_code,
    course_title,
    course_description,
    Credits,
    taken,
    prerequisites_list,
    Instructor_score_list
  });

  try {
    await newCourseItem.save();

    res.status(201).json(newCourseItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { term, year, course_subject, course_code, course_title, course_description, Credits, taken, prerequisites_list, Instructor_score_list} = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedCourse = {
    term,
    year,
    course_subject,
    course_code,
    course_title,
    course_description,
    Credits,
    taken,
    prerequisites_list,
    Instructor_score_list,
    _id: id
  };

  await CourseItem.findByIdAndUpdate(id, updatedCourse, { new: true });

  res.json(updatedCourse);
  console.log("updated course: ", updatedCourse);
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await CourseItem.findByIdAndRemove(id);

  res.json({ message: "Course deleted successfully." });
};

export default router;