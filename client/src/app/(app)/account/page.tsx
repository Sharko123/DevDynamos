"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import Image from "next/image";

interface Beat {
  id: string;
  name: string;
}

const beats: Beat[] = [
  { id: "1", name: "Beat 1" },
  { id: "2", name: "Beat 2" },
  { id: "3", name: "Beat 3" },
];

const AccountPage: React.FC = () => {
  const router = useRouter();

  const handlePlay = (beatId: string) => {
    router.push(`/beats/${beatId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-4">
      <main className="ml-64">
        {/* User Info Section */}
        <div className="flex items-center mb-6 bg-gray-800 p-4 rounded-lg shadow-md">
          <Image
            src={"https://randomuser.me/api/portraits/lego/4.jpg"}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4 border-2 border-blue-500"
            width={256}
            height={256}
          />
          <div>
            <h1 className="text-2xl text-white">Lego User</h1>
            <p className="text-gray-400">Welcome back!</p>
          </div>
        </div>

        {/* Beats List Section */}
        <h2 className="text-xl text-white mb-4">Your Beats</h2>
        <ul className="space-y-4">
          {beats.map((beat) => (
            <li
              key={beat.id}
              className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:bg-gray-700"
              onClick={() => handlePlay(beat.id)}
            >
              <Play size={24} className="text-white mr-4" />
              <span className="text-white">{beat.name}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default AccountPage;
