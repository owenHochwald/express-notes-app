import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
},
    { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;