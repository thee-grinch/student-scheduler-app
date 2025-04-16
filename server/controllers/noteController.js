import fs from 'fs';
import path from 'path';
import Note from '../models/Note.js';

export const uploadNote = async (req, res) => {
  try {
    const { originalname, filename } = req.file;

    const note = await Note.create({
      user: req.user.id,
      title: originalname,
      filePath: filename,
    });

    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const downloadNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findOne({ _id: id, user: req.user.id });

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    const filePath = path.join(__dirname, '../../uploads', note.filePath);
    res.download(filePath, note.title);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};