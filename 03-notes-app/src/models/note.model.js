const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  content: { type: String, default: '' },
  tags: [{ type: String, lowercase: true, trim: true }],
  color: { type: String, default: '#ffffff' },
  isPinned: { type: Boolean, default: false },
  isArchived: { type: Boolean, default: false },
}, { timestamps: true });

// Text index for search
noteSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('Note', noteSchema);
