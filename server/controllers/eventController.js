import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id });
    res.json(events);
    console.log(events[0])
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { title, date, time } = req.body; // Include time
    const event = await Event.create({ user: req.user.id, title, date, time });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOneAndDelete({ _id: id, user: req.user.id });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};