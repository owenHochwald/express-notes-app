import { useEffect, useState, useCallback } from "react";
import api from "../lib/axios";
import BackButton from "../components/BackButton";
import GraphFlow from "../components/GraphFlow";
import { useNavigate } from "react-router";
import { getLayoutedElements, type Note } from "../lib/graphLayout";
import type { Edge, Node } from "reactflow";

const GraphPage: React.FC = () => {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get<Note[]>("/notes/graph");
        const { nodes, edges } = getLayoutedElements(response.data);
        setNotes(response.data);
        setNodes(nodes);
        setEdges(edges);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      navigate(`/notes/${node.id}`);
    },
    [navigate]
  );

  if (!notes) {
    return <div>Loading graph...</div>;
  }

  return (
    <div
      data-theme="coffee"
      className="w-full h-screen p-6 bg-base-100 relative"
    >
      <BackButton />
      <div className="w-full h-full rounded-lg shadow-lg bg-neutral overflow-hidden">
        <GraphFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
};

export default GraphPage;
