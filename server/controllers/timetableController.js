import Timetable from '../models/Timetable.js';
import Course from '../models/Course.js';

export const createTimetable = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch courses for the user
    const courses = await Course.find({ user: userId });

    if (!courses.length) {
      return res.status(400).json({ message: 'No courses available to create a timetable.' });
    }

    // Calculate total weight
    const totalWeight = courses.reduce((sum, course) => sum + course.weight, 0);

    // Generate timetable
    const timetable = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let currentDayIndex = 0;
    let currentTime = 9; // Start at 9:00 AM

    for (const course of courses) {
      const classCount = Math.ceil((course.weight / totalWeight) * 10); // Allocate classes based on weight

      for (let i = 0; i < classCount; i++) {
        if (currentTime + 2 > 17) { // If the day is full, move to the next day
          currentDayIndex++;
          currentTime = 9;
        }

        if (currentDayIndex >= days.length) {
          return res.status(400).json({ message: 'Not enough days to allocate all classes.' });
        }

        timetable.push({
          user: userId,
          subject: course.name,
          day: days[currentDayIndex],
          startTime: `${currentTime}:00`,
          endTime: `${currentTime + 2}:00`,
          location: 'Room 101',
        });

        currentTime += 3; // 2-hour class + 1-hour break
      }
    }

    // Save timetable to the database
    const savedTimetable = await Timetable.insertMany(timetable);
    res.status(201).json(savedTimetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ user: req.user.id });
    res.json(timetable);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message });
  }
};

export const addClass = async (req, res) => {
  try {
    const { subject, day, startTime, endTime, location } = req.body;
    const newClass = await Timetable.create({
      user: req.user.id,
      subject,
      day,
      startTime,
      endTime,
      location
    });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, day, startTime, endTime, location } = req.body;

        const updatedClass = await Timetable.findByIdAndUpdate(
            id,
            { subject, day, startTime, endTime, location },
            { new: true, runValidators: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json(updatedClass);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedClass = await Timetable.findByIdAndDelete(id);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.json({ message: 'Class deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteTimetableEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Timetable.findOneAndDelete({ _id: id, user: req.user.id });

    if (!entry) {
      return res.status(404).json({ message: 'Timetable entry not found.' });
    }

    res.json({ message: 'Timetable entry deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
