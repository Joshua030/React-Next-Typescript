import type { BasicPageProps } from "@/types";
import { Logo } from "./partials/Logo";

const NavBar: React.FC<BasicPageProps> = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

export default NavBar;
