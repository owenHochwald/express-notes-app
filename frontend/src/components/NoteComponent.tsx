import { Link } from "react-router";

type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const NoteComponent = (note: Note) => {
    return (
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title">{note.title}</h2>
                <p>{note.content}</p>
                <div className="card-actions justify-end">
                    <button className="btn">
                        <Link to={`/note:${note._id}`}>Edit Note</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteComponent;