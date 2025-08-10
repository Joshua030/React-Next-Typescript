import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleOrderSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  };
  return (
    <form onSubmit={handleOrderSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search order #"
        className="sm:w64 focus-outline-none w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-400 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
