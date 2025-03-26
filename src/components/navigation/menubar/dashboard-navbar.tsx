"use client";

import { useState } from "react";
import UserProfile from "./user-profile";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DashboardNavBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white">
      <div className="w-full flex items-center gap-6">
        <p className="font-bold text-lg">STORE TITLE</p>

        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <Input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <UserProfile fullName="USERNAME" role="Store Admin" />
    </div>
  );
};

export default DashboardNavBar;
