import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/results?country=${country}&year=${year}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Find Tourist Spots</h1>
          <p className="text-lg">Explore popular destinations worldwide</p>
        </div>
      </div>

      {/* Search Box */}
      <div className="max-w-3xl mx-auto mt-[-50px] relative z-10">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="p-3 border rounded w-full"
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="IN">India</option>
              <option value="GB">United Kingdom</option>
            </select>
            <input
              type="number"
              placeholder="Year"
              className="p-3 border rounded w-full"
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
