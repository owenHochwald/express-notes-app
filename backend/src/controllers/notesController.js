import Note from '../models/Note.js';

export async function getNote(req, res) {
    try {
        const noteId = req.params.id;
        const foundNote = await Note.findById(noteId);
        if (!foundNote) return res.status(404).json({ message: "wasnt able to find that note" });
        res.status(200).json(foundNote);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
}

export const getAllNotes = async (_, res) => {

    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
}

export const graphNotes = async (_, res) => {
    try {
        const notes = await Note.find({}).populate("connections");
        console.log("Fetched graph notes:", notes);
        res.json(notes);
    } catch (err) {
        console.error("Error fetching graph notes:", err);
        res.status(500).json({ message: "Error fetching graph notes" });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, content, connections = [] } = req.body;

        const newNote = new Note({
            title,
            content,
            connections,
        });

        await newNote.save();
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {
        console.error("Error creating notes:", error);
        res.status(500).json({ message: "Error creating note", error: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const noteId = req.params.id;

        const updatedNote = await Note.findByIdAndUpdate(noteId,
            { title, content },
            { new: true });
        if (!updatedNote) return res.status(404).json({ message: "Note not found " });
        res.status(201).json(updateNote)
    } catch (error) {
        console.error("Error updating notes:", error);
        res.status(500).json({ message: "Error updating notes", error: error.message });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deleteNote) return res.status(404).json({ message: "Couldnt find the note you were looking for" })
        res.status(200).json(deletedNote)

    } catch (error) {
        console.error("Error deleting notes:", error);
        res.status(500).json({ message: "Error deleting notes", error: error.message });
    }
}