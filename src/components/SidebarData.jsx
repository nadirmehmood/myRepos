import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import React from "react";

const SidebarData = [
  {
    title: "Users",
    path: "/home/Users",
    icon: <FaIcons.FaUser />,
    cName: "nav-text",
  },
  {
    title: "Transactions",
    path: "/home/Transactions",
    icon: <FaIcons.FaDatabase />,
    cName: "nav-text",
  },
];

export default SidebarData;
