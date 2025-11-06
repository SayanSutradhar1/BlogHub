"use client"

import React from "react";
import AllBlogs from "./AllBlogs";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Blog } from "@/lib/types";

const SearchQuery = ({ blogs }: { blogs: Blog[] }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  return (
    <>
      <div className="relative max-w-2xl mx-auto group mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
        <Input
          placeholder="Search blogs by title, content, or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-6 text-base bg-card/50 backdrop-blur-sm border-border/40 focus:border-blue-500 transition-all duration-300 rounded-xl"
        />
      </div>
      <AllBlogs blogs={blogs} searchQuery={searchQuery} />
    </>
  );
};

export default SearchQuery;
