"use client";
import React from "react";
import { Home, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ManagerSidebar = () => {
  const [activeTab, setActiveTab] = React.useState("Dashboard");

  const tabs = [
    { name: "Submit and View", link: "dashboard", icon: <Home size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 pt-6 h-screen bg-[#1C1C1C] border-r border-gray-200 flex flex-col transition-all duration-300 w-64`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-gray-600"
      >
        <ChevronLeft size={24} />
      </Button>

      <nav className="flex-1 mt-16">
        <ul>
          {tabs.map((tab) => (
            <li key={tab.name}>
              <Link href={`/${tab.link}`}>
                <button
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center px-4 py-3 text-left transition-colors duration-200
                  ${
                    activeTab === tab.name
                      ? "bg-[#343434] text-green-600 border-r-4 border-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ManagerSidebar;
