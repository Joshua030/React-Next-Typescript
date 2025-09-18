import SideNavigation from "../_components/SideNavigation";

interface layoutProps {
  children: React.ReactNode;
}

const layout = ({ children }: layoutProps) => {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />
      <div className="py-1">{children}</div>
    </div>
  );
};

export default layout;
