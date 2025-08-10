import { Link, useNavigate } from "react-router-dom";

interface LinkButtonProps {
  children: React.ReactNode; // Define the type of children to be React nodes
  to: string; // The URL to navigate to when the button is clicked
}

const LinkButton: React.FC<LinkButtonProps> = ({ children, to }) => {
  const navigate = useNavigate();
  const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";
  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default LinkButton;
