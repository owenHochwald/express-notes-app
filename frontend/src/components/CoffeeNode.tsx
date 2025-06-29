import React from "react";

interface CoffeeNodeData {
  label: string;
}

interface CoffeeNodeProps {
  id: string;
  data: CoffeeNodeData;
  selected: boolean;
}

const CoffeeNode: React.FC<CoffeeNodeProps> = ({ data }) => {
  return (
    <div className="p-3 rounded-lg bg-primary text-base-100 font-semibold select-none cursor-grab">
      {data.label}
    </div>
  );
};

export default CoffeeNode;
