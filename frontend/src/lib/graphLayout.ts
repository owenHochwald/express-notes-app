import dagre from "@dagrejs/dagre";

const nodeWidth = 172;
const nodeHeight = 36;

export interface Note {
  _id: string;
  title: string;
  connections: { _id: string }[];
}

export interface NodeType {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  type?: string;
}

export interface EdgeType {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export const getLayoutedElements = (notes: Note[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "LR" });

  notes.forEach((note) => {
    dagreGraph.setNode(note._id, { width: nodeWidth, height: nodeHeight });
  });

  const edges = notes.flatMap((note) =>
    (note.connections || []).map((conn) => ({
      source: note._id,
      target: conn._id,
    }))
  );

  edges.forEach(({ source, target }) => {
    dagreGraph.setEdge(source, target);
    dagreGraph.setEdge(target, source);
  });

  dagre.layout(dagreGraph);

  const nodes: NodeType[] = notes.map((note) => {
    const nodeWithPosition = dagreGraph.node(note._id);
    return {
      id: note._id,
      type: "coffeeNode",
      data: { label: note.title },
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  const edgesWithId: EdgeType[] = edges.map(({ source, target }) => ({
    id: `${source}-${target}`,
    source,
    target,
    type: "default",
  }));

  return { nodes, edges: edgesWithId };
};
