const express = require("express");
const {
  getAllStudent,
  addStudent,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  addCourseToStudent,
  removeCourseToStudent,
} = require("../controllers/student");

const studentRouter = express.Router();

studentRouter.get("", getAllStudent);
studentRouter.post("", addStudent);
studentRouter.get("/:id", getStudentById);
studentRouter.put("/:id", updateStudentById);
studentRouter.delete("/:id", deleteStudentById);
studentRouter.post("/:id/courses/:code", addCourseToStudent);
studentRouter.delete("/:id/courses/:code", removeCourseToStudent);

module.exports = studentRouter;
