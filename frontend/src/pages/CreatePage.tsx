import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

type Note = {
    _id: string;
    title: string;
};

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [connections, setConnections] = useState<string[]>([]);
    const [existingNotes, setExistingNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotes = async () => {
            const res = await api.get<Note[]>("/notes");
            setExistingNotes(res.data);
        };
        fetchNotes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await api.post("/notes", {
                title,
                content,
                connections,
            });

            toast.success("Note created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating note", error);
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                toast.error("Slow down! You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error("Failed to create note");
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleConnection = (id: string) => {
        setConnections((prev) =>
            prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-base-200 py-10">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto space-y-6">
                    <Link to="/" className="inline-flex items-center gap-2 text-sm btn btn-ghost">
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Notes
                    </Link>

                    <div className="card bg-base-100 shadow-md">
                        <div className="card-body space-y-4">
                            <h2 className="card-title text-2xl">Create New Note</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Note Title"
                                        className="input input-bordered"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Content</span>
                                    </label>
                                    <textarea
                                        placeholder="Write your note here..."
                                        className="textarea textarea-bordered h-32"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Connect to Other Notes (optional)</span>
                                    </label>
                                    <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                                        {existingNotes.map((note) => (
                                            <label key={note._id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    checked={connections.includes(note._id)}
                                                    onChange={() => toggleConnection(note._id)}
                                                />
                                                {note.title}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="card-actions justify-end pt-2">
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
