const express = require('express');
const leaveRouter = express.Router();
const LeaveRequest = require('../model/leaveRequest');
const Employee = require('../model/employee');

// Get all leave requests
leaveRouter.get('/', async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('employee', 'name');
    res.json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new leave request
leaveRouter.post('/', async (req, res) => {
  const { employeeId, startDate, endDate } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const newLeaveRequest = new LeaveRequest({ employee: employeeId, startDate, endDate });
    await newLeaveRequest.save();
    
    res.json(newLeaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve or reject leave request by ID
leaveRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete leave request by ID
leaveRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const leaveRequest = await LeaveRequest.findByIdAndDelete(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }
    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = leaveRouter;
