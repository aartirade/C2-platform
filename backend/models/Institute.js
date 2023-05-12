const mongoose = require("mongoose");
const instituteSchema = new mongoose.Schema({
  institute_name: {
    type: String,
    required: false,
  },
  instituteCode: {
    type: Number,
    required: false,
  },
  student: [
    {
      institute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
      },
    },
  ],
});

module.exports = mongoose.model("Institute", instituteSchema);
