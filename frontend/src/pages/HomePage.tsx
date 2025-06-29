import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import RateLimit from "../components/RateLimit";
import NoteComponent from "../components/NoteComponent";
import api from "../lib/axios";


type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    connections: Note[];
}

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState<Note[] | null>();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get<Note[]>("/notes");
                setNotes(response.data);
            }
            catch (error) {
                console.log("There was an error trying to fetch your notes og");
                if (axios.isAxiosError(error) && error.response?.status == 429) {
                    setIsRateLimited(true);
                } else {
                    toast.error("Failed to load your notes");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [])


    return (
        <div >
            <Navbar />

            {isRateLimited && <RateLimit />}
            <div className="max-w-7xl mx-auto p-4 mt-6">
                {loading && <div className="text-center text-primary py-10">Loading notes... </div>}

                {(notes ?? []).length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(notes ?? []).map((n: Note, _: number) => <NoteComponent {...n} />)}
                    </div>
                )}
            </div>

        </div>
    )
}

export default HomePage;