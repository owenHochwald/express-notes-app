import type { MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    connections: Note[];
}

const NoteDetailPage = () => {
    const [note, setNote] = useState<Note>();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {

                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log(error, "Whoops, looks like there was an error!");
            } finally {
                setLoading(false);
            }
        }
        fetchNote();
    }, []);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        if (!note?._id) return;

        try {
            await api.delete(`/notes/${note._id}`);
            toast.success("Note deleted successfully");
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                console.log("There was some sort of server side error");
            }
        }
    };

    const handleSave = async (
        e: ReactMouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        if (!note?.title.trim() || !note?.content.trim()) {
            toast.error("Plz add the required fields");
            return;
        }

        setSaving(true);

        try {
            if (!note?._id) {
                toast.error("Note ID is missing");
                return;
            }
            await api.put(`/notes/${note._id}`, note);
            toast.success("Note updated successfully")
        } catch (error) {
            toast.error("Plz add the required fields");
        } finally {
            setSaving(false);

        }
    }


    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="h-5 w-5" />
                            Back to Notes
                        </Link>
                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="h-5 w-5" />
                            Delete Note
                        </button>
                    </div>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered"
                                    value={note?.title}
                                    onChange={(e) => note && setNote({ ...note, title: e.target.value })}
                                />
                            </div>

                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text">Content</span>
                                </label>
                                <textarea
                                    placeholder="Write your note here..."
                                    className="textarea textarea-bordered h-32"
                                    value={note?.content}
                                    onChange={(e) => note && setNote({ ...note, content: e.target.value })}
                                />
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteDetailPage;