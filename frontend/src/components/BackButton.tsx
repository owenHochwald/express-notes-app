import { useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="btn btn-outline btn-sm absolute top-4 left-4 flex items-center gap-2 z-10"
      data-theme="coffee"
    >
      <ArrowLeftIcon className="w-5 h-5" />
      Back
    </button>
  );
};

export default BackButton;
