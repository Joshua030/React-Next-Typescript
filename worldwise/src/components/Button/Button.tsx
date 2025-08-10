import { ReactNode } from "react";
import styles from "./Button.module.css";
import { ButtonType } from "../../types";

interface ButtonProps {
  children: ReactNode | ReactNode[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonType;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
};

export default Button;
