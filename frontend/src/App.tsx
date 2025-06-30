import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import GraphPage from "./pages/GraphPage"

const App = () => {
    return (
        <div className="relative h-full w-full">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/note/:id" element={<NoteDetailPage />} />
                <Route path="/graph" element={<GraphPage />} />
            </Routes>

        </div>
    )
}

export default App;