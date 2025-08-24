import { useSearchParams } from "react-router";
import Select from "./Select";

interface SortByProps {
  options: { value: string; label: string }[];
}

const SortBy = ({ options }: SortByProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "";
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return <Select options={options} value={sortBy} type="white" onChange={handleChange} />;
};

export default SortBy;
