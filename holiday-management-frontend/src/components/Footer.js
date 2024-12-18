import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto text-center px-4">
        <p className="text-lg font-semibold mb-2">
          Explore the World with Holiday Finder
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact Us</a>
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
        </div>
        <p className="text-sm">
          © {new Date().getFullYear()} Holiday Finder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
