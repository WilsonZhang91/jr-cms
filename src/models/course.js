const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    _id: {
      uppercase: true,
      type: String,
      alias: "code",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    __v: {
      select: false, //not display
      type: Number,
    },
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      }, //一对多
    ],
    // student: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Student",
    // },    一对一
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Model = mongoose.model("Course", schema);

module.exports = Model;
