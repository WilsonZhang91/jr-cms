const Joi = require("joi");
const Course = require("../models/course");
const Student = require("../models/student");

async function getAllCourse(req, res) {
  //limit 分页
  //skip/limit  跳过，拿下一页数据
  const courses = await Course.find().exec();
  res.json(courses);
}

async function getCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findById(id).exec();
  if (!course) {
    return res.status(404).json({
      error: "course not found",
    });
  }
  res.json(course);
}

async function addCourse(req, res) {
  // const { code, name, description } = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    //以字母开头，数字结尾 COMP0011
    code: Joi.string()
      .regex(/^[a-zA-Z]+[0-9]+$/)
      .required(),
    description: Joi.string(),
  });
  const { code, name, description } = await schema.validateAsync(req.body, {
    allowUnknown: true,
    stripUnknown: true,
  });
  const course = new Course({ code, name, description });
  await course.save();
  return res.status(201).json(course);
  // .then()
  // .catch((e) => {
  //   console.log(e);
  //   return res.send(e);
  // });
}

async function updateCourseById(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  const course = await Course.findByIdAndUpdate(
    id,
    { name, description },
    { new: true }
  ).exec();
  if (!course) {
    return res.status(404).json({
      error: "course not found",
    });
  }
  res.json(course);
}

async function deleteCourseById(req, res) {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id).exec();
  if (!course) {
    return res.status(404).json({
      error: "course not found",
    });
  }
  await Student.updateMany(
    { courses: course._id },
    { $pull: { courses: course._id } }
  );
  res.sendStatus(204);
}

module.exports = {
  getAllCourse,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
};
