import type { BasicPageProps } from "@/types";

const MainInformation = ({ children }: BasicPageProps) => {
  return <main className="main">{children}</main>;
};

export default MainInformation;
