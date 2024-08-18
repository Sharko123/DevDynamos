"use client";
import React from "react";
import { Home, Upload, Plus, User } from "lucide-react";
import Link from "next/link";

// THe sidebar component

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64  text-white shadow-lg">
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h1 className="text-xl font-bold">BeatApp</h1>
      </div>
      <div className="mt-8 space-y-4">
        <SidebarItem icon={<Home />} label="Feed" href="/" />
        <SidebarItem icon={<Upload />} label="Upload" href="/beats/upload" />
        <SidebarItem icon={<Plus />} label="Generate" href="/beats/generate" />
        {/* <SidebarItem icon={<User />} label="Account" href="/account" /> */}
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, href }) => {
  return (
    <Link
      href={href}
      className="flex items-center p-4 text-gray-300 hover:bg-blue-500 hover:text-white transition-colors duration-200 rounded-lg"
    >
      <div className="mr-4">{icon}</div>
      {label}
    </Link>
  );
};

export default Sidebar;
