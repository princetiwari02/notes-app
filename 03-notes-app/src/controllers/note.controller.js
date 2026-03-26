const Note = require('../models/note.model');

// GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    const { search, tag, pinned, archived, page = 1, limit = 20 } = req.query;
    const query = { user: req.user.id };

    if (search) query.$text = { $search: search };
    if (tag) query.tags = tag.toLowerCase();
    if (pinned !== undefined) query.isPinned = pinned === 'true';
    if (archived !== undefined) query.isArchived = archived === 'true';
    else query.isArchived = false; // default: exclude archived

    const notes = await Note.find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Note.countDocuments(query);
    res.json({ total, page: Number(page), notes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/notes
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, user: req.user.id });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/notes/tags/all — get all unique tags for current user
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Note.distinct('tags', { user: req.user.id });
    res.json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
