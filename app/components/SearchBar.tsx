"use client"

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [address, setAddress] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    router.push(`/${address}`);
  }

  return (
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border-2 border-gray-300 rounded-md w-full text-center px-4 py-2 mb-4 flex-grow text-black"
        placeholder="Search"
      />
      <button type="submit">Submit</button>
    </form>
  );
}