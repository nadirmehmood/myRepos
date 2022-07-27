import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import React from "react";

const SidebarData = [
  {
    title: "Home",
    path: "/Home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Users",
    path: "/Users",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Transactions",
    path: "/Transactions",
    icon: <FaIcons.FaDatabase />,
    cName: "nav-text",
  },
];

export default SidebarData;
