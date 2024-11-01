const mongoose = require("mongoose");

const coursesSchema = mongoose.Schema({
  name: String,
});

const CoursesModel = mongoose.model("Courses", coursesSchema, "courses");

const read = async () => {
  return await CoursesModel.find();
};

const create = async (data) => {
  const newCourse = new CoursesModel(data);
  return await newCourse.save();
};

const update = async (_id, data) => {
  return await CoursesModel.updateOne({ _id }, data);
};

const remove = async (_id) => {
  return await CoursesModel.deleteOne({ _id });
};

module.exports = {
  read,
  create,
  update,
  remove,
};