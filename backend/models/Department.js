const mongoose = require("mongoose");
const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true,
  },
  departmentCode: {
    type: string,
    required: true,
  },
});

const department = mongoose.model("department", departmentSchema);
module.exports = department;
