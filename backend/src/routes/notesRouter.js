import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote, getNote, graphNotes } from '../controllers/notesController.js';

const router = express.Router();

router.get('/graph', graphNotes);
router.get('/', getAllNotes);
router.get('/:id', getNote)
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;