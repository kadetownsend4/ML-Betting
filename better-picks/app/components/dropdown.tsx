"use client";
import React from "react";

interface DropdownProps {
  title: string;
  options: string[];
  links: string[];
  isOpen: boolean;
  setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Dropdown({ title, options, links, isOpen, setOpenDropdown }: DropdownProps) {
  return (
    <div className="relative z-[999] overflow-visible">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : title)}
        className="text-white hover:text-green-400 transition"
      >
        {title}
      </button>
      {isOpen && (
        <ul className="absolute mt-2 w-48 bg-gray-900 rounded shadow-lg z-[999]">
          {options.map((option, index) => (
            <li key={index}>
              <a href={links[index]} className="block px-4 py-2 hover:bg-gray-700">
                {option}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


