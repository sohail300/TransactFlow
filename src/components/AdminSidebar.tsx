"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  FileText,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setActiveTab(pathname.substring(1));
  }, [pathname]);

  const tabs = [
    {
      name: "View Transactions",
      link: "admin/view-transactions",
      icon: <FileText size={20} />,
    },
    {
      name: "View All Audit Logs",
      link: "admin/view-audit-logs",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Manage Roles",
      link: "admin/manage-roles",
      icon: <Home size={20} />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 mt-16 h-screen bg-[#1C1C1C] border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-gray-400"
        onClick={toggleSidebar}
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
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
                    activeTab === tab.link
                      ? "bg-[#343434] text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  {isOpen && (
                    <span className="text-sm font-medium">{tab.name}</span>
                  )}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
