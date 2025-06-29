import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";

type GraphFlowProps = {
    nodes: any[];
    edges: any[];
    onNodeClick: (event: React.MouseEvent, node: any) => void;
};

const GraphFlow = ({ nodes, edges, onNodeClick }: GraphFlowProps) => {
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            onNodeClick={onNodeClick}
            panOnScroll
            zoomOnScroll
            zoomOnPinch
        >
            <Controls />
        </ReactFlow>
    );
};

export default GraphFlow;
