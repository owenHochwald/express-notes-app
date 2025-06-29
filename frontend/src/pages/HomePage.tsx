import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import RateLimit from "../components/RateLimit";
import NoteComponent from "../components/NoteComponent";


type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState<Note[] | null>();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get<Note[]>("http://localhost:5001/api/notes");
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
        <div>
            <Navbar />
            {isRateLimited ?
                <RateLimit />
                :
                notes?.map((n: Note, _: number) => <NoteComponent {...n} />)

            }
        </div>
    )
}

export default HomePage;