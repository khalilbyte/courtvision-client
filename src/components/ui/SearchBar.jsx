import { useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        max-w-xl w-full relative rounded-lg border
        ${isFocused ? "border-blue-500 shadow-lg" : "border-gray-200"}
        transition-all duration-200
      `}
    >
      <div className="flex items-center px-4 py-2">
        <Search
          size={20}
          className={`
            ${isFocused ? "text-blue-500" : "text-gray-400"}
            transition-colors duration-200
          `}
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search..."
          className="
            w-full px-3 py-1
            bg-transparent
            focus:outline-none
            placeholder:text-gray-400
          "
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="
              p-1 rounded-full
              hover:bg-gray-100
              transition-colors duration-200
            "
          >
            <X size={16} className="text-gray-400" />
          </button>
        )}

        <button
          type="submit"
          className="
            ml-2 px-4 py-1
            bg-blue-500 text-white
            rounded-md
            hover:bg-blue-600
            transition-colors duration-200
            flex items-center gap-2
          "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
