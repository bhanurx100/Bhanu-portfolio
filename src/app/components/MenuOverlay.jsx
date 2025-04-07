import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
  return (
    <div className="md:hidden bg-[#121212] bg-opacity-95 fixed top-0 left-0 w-full h-screen z-40">
      <ul className="flex flex-col items-center justify-center h-full space-y-8">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink href={link.path} title={link.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuOverlay;