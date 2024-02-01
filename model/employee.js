const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  // Add other employee details as needed
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
