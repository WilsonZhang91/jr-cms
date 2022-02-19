const express = require("express");
const {
  getAllCourse,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/course");

const courseRouter = express.Router();

courseRouter.get("", getAllCourse);
courseRouter.post("", addCourse);
courseRouter.get("/:id", getCourseById);
courseRouter.put("/:id", updateCourseById);
courseRouter.delete("/:id", deleteCourseById);

module.exports = courseRouter;
