import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import type { MouseEvent as ReactMouseEvent } from "react";
import api from "../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";

type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    connections: Note[];
}

interface NoteComponentProps {
    note: Note;
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteComponent: React.FC<NoteComponentProps> = ({ note, setNotes }) => {
    const handleDelete = async (
        e: ReactMouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        e.preventDefault();
        console.log(id, e);

        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            setNotes((prev) => prev ? prev.filter(note => note._id !== id) : prev);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                console.log("There was some sort of server side error");
            }
        }
    };

    return (
        <Link
            to={`/note/${note._id}`}
            className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#bd8921]"
        >
            <div className="card-body">
                <h3 className="card-title text-base-content">{note.title}</h3>
                <p className="text-base-content/70 line-clamp-3">{note.content}</p>
                <div className="card-actions justify-between items-center mt-4">
                    <span className="text-sm text-base-content/60">
                        {formatDate(new Date(note.createdAt))}
                    </span>
                    <div className="flex items-center gap-1">
                        <PenSquareIcon className="size-4" />
                        <button
                            className="btn btn-ghost btn-xs text-error"
                            onClick={(e) => handleDelete(e, note._id)}
                        >
                            <Trash2Icon className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteComponent;