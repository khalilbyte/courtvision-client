/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import axios from "axios";

export default function SearchBar({ onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const BASE_URL = "http://localhost:8080/api/v1";
  const inputRef = useRef();

  const createSearchPlayersUrl = (keyword) => {
    return `${BASE_URL}/players/search?keyword=${keyword}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      searchTerm.trim() === "" ||
      /^[A-Za-z]+$/.test(searchTerm) !== true ||
      searchTerm.length < 3
    ) {
      return onSearchResults([], "Value must be minimum 3 letters.");
    }

    try {
      const response = await axios.get(createSearchPlayersUrl(searchTerm));
      const searchResults = response.data;

      if (searchResults.length === 0) {
        onSearchResults([], "No players found matching your search.");
      } else {
        onSearchResults(searchResults);
      }

      setSearchTerm("");
    } catch (e) {
      onSearchResults([], "An error occurred while searching for players.");
      console.error("Error searching players:", e.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative rounded-lg border ${
        isFocused ? "border-blue-500 shadow-lg" : "border-gray-200"
      } transition-all duration-200`}
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={inputRef}
          placeholder="Search..."
          className="
            w-full px-3 py-1
            bg-transparent
            focus:outline-none
            placeholder:text-gray-400
          "
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="border-2 border-green-500
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
}
