import Assignment from '../models/Assignment.js';

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ user: req.user.id }).sort({ deadline: 1 });
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addAssignment = async (req, res) => {
  try {
    const { title, deadline } = req.body;
    const assignment = await Assignment.create({ user: req.user.id, title, deadline });
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status: 'completed' },
      { new: true }
    );
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await Assignment.findOneAndDelete({ _id: id, user: req.user.id });
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};