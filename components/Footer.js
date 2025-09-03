// components/Footer.jsx
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <span className="text-lg font-semibold">School Directory</span>
        </div>

        <div className="flex space-x-6 text-sm">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/addSchool" className="hover:text-white">Add School</Link>
          <Link href="/showSchools" className="hover:text-white">View Schools</Link>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} School Directory. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
