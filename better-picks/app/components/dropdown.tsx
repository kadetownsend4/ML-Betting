<<<<<<< HEAD
// "use client";
// import React from "react";
// // Interface defining the expected props for the Dropdown component
// interface DropdownProps {
//   // Title of the dropdown 
//   title: string;
//   // Array of options to be displayed
//   options: string[];
//   // Array of links that correspond to each option
//   links: string[];
//   // Boolean that indicates whether the drop down is currently open. 
//   isOpen: boolean;
//   // Function to set the open/close state of the dropdown. 
//   setOpenDropdown: React.Dispatch<React.SetStateAction<string | null>>;
// }


// /**
//  * Dropdown component that displays a clickable button to toggle a list of options 
//  * @param {DropdownProps} props - The props for the dropdown component 
//  * @returns JSX element representing the dropdown menu. 
//  */
// export default function Dropdown({ title, options, links, isOpen, setOpenDropdown }: DropdownProps) {
//   return (
//     <div className="relative z-[999] overflow-visible">
//       {/* Button to toggle dropdown visibility */}
//       <button
//         onClick={() => setOpenDropdown(isOpen ? null : title)}
//         className="text-white hover:text-green-400 transition"
//       >
//         {title} {/* Button label is the title  */}
//       </button>
//       {/* Conditional rendering of the dropdown menu when 'isOpen' is true */}
//       {isOpen && (
//         <ul className="absolute mt-2 w-48 bg-gray-900 rounded shadow-lg z-[999]">
//           {/* Map over options and display them as list items with corresponding links */}
//           {options.map((option, index) => (
//             <li key={index}>
//               <a href={links[index]} className="block px-4 py-2 hover:bg-gray-700">
//                 {option} {/* Display option text */}
//               </a>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
=======
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
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : title)}
        className="text-white hover:text-green-400 transition"
      >
        {title}
      </button>
      {isOpen && (
        <ul className="absolute mt-2 w-48 bg-gray-900 rounded shadow-lg z-10">
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
>>>>>>> bae9ee246ac9055185ff74bd2a5b692fadc0c7e9


