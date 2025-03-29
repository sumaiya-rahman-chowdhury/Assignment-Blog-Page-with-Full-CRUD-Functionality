import { FaSearch, FaFilter } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg pt-10">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search blog by Title/Author's name/Destination/Category"
          className="outline-none px-9 py-3 rounded-full w-full shadow-lg"
        />
        <button className="ml-2 bg-[#003B95] text-white px-9 py-3 rounded-full hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* Filters */}
      <div className="flex mt-4 gap-3 flex-wrap">
        <button className="px-4 py-2 bg-white border rounded-lg shadow-sm">
          Destination ⌄
        </button>
        <button className="px-4 py-2 bg-white border rounded-lg shadow-sm">
          Category ⌄
        </button>
        <button className="px-4 py-2 bg-white border rounded-lg shadow-sm">
          Sub-Category ⌄
        </button>

        {/* Sort & Reset */}
        <div className="ml-auto flex gap-2">
          <button className="px-4 py-2 bg-white border rounded-lg shadow-sm flex items-center">
            Sort by <FaFilter className="ml-1" />
          </button>
          <button className="px-4 py-2 bg-white border rounded-lg shadow-sm">
            Reset ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
