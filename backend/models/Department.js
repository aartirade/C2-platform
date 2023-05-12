const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: false,
  },
  departmentCode: {
    type: string,
    required: false,
  },
});

module.exports = mongoose.model("Department", departmentSchema);
