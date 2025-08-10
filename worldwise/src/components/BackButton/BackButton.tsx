import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { ButtonType } from "../../types";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type={ButtonType.Back}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(-1);
        console.log("clicked");
        console.log("History.state before pushState: ", history.state);
      }}
    >
      &larr; Back
    </Button>
  );
};

export default BackButton;
