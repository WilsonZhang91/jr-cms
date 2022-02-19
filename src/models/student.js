const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
        const validation = Joi.string().email().validate(email);
        const { error } = validation;
        if (error) {
          return false;
        }
        // return !Joi.string().email().validate(email).error;
      },
      msg: "Invalid email format",
    },
  },
  courses: [
    {
      type: String,
      ref: "Course",
    },
  ],
});

const Model = mongoose.model("Student", schema);

module.exports = Model;
