import { useState } from "react";
import { FaSearch, FaFilter, FaChevronDown } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

interface DropdownOption {
  label: string;
  options: string[];
}

const dropdowns: DropdownOption[] = [
  { label: "Destination", options: ["USA", "UK", "Canada"] },
  { label: "Category", options: ["Tech", "Travel", "Food"] },
  { label: "Sub-Category", options: ["AI", "Blockchain", "Cybersecurity"] },
];
const SearchBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string;
  }>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const handleSelect = (label: string, value: string) => {
    setSelectedValues((prev) => ({ ...prev, [label]: value }));
    setOpenDropdown(null); // Close dropdown
  };
  return (
    <div className=" p-4 rounded-lg ">
      <div className="flex items-center gap-0">
        <button
          className="text-gray-500 mr-0 text-3xl rounded-l-full
          h-12 w-19 text-center bg-[#D2ECF4] shadow-lg "
        >
          {" "}
          <FiMenu className="ml-4" />
        </button>
        <input
          type="text"
          placeholder="Search blog by Title/Author's name/Destination/Category"
          className="outline-none px-9 py-3 w-full shadow-lg bg-[#D2ECF4] border-l-0 "
        />
        <button
          className="text-gray-500 mr-0 text-3xl rounded-r-full
          h-12 w-19 text-center bg-[#D2ECF4] shadow-lg"
        >
          {" "}
          <FaSearch className="ml-4" />
        </button>
        <button className="ml-2 bg-[#003B95] text-white px-9 py-3 rounded-full hover:bg-blue-700">
          Search
        </button>
      </div>

      <div className="flex mt-4 gap-3 flex-wrap justify-between">
        <div className="flex mt-4 gap-3 flex-wrap ">
          {dropdowns.map((dropdown) => (
            <div key={dropdown.label} className="relative ">
              <button
                className="px-4 py-2 bg-[#D2ECF4] border-2 border-[#7099C8]
                rounded-sm
                text-[#003B95] shadow-sm flex items-center"
                onClick={() => toggleDropdown(dropdown.label)}
              >
                {selectedValues[dropdown.label] || dropdown.label}
                <FaChevronDown className="ml-2" />
              </button>

              {openDropdown === dropdown.label && (
                <div className="absolute mt-1 w-40 bg-[#D2ECF4] border  shadow-lg z-10">
                  <ul className="py-2">
                    {dropdown.options.map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect(dropdown.label, option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <button className="px-4 py-2 bg-[#D2ECF4] border-2 border-[#7099C8] rounded-sm shadow-sm flex items-center">
            Sort by <FaFilter className="ml-1" />
          </button>
          <button
            className="px-4 py-2 bg-[#D2ECF4] border-2 border-[#7099C8] rounded-sm shadow-sm"
            onClick={() => setSelectedValues({})}
          >
            Reset ↻
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
