const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  getNotes, getNoteById, createNote, updateNote, deleteNote, getAllTags
} = require('../controllers/note.controller');

router.use(auth); // All note routes require auth
router.get('/tags/all', getAllTags);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;
