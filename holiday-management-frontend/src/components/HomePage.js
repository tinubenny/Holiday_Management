import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer"; // Footer component

const HomePage = () => {
  const [countries, setCountries] = useState([]); // List of countries
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered results
  const [searchTerm, setSearchTerm] = useState(""); // Search term for country
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [itemsPerPage] = useState(8); // Show 8 items per page
  const navigate = useNavigate();

  // Fetch country list from backend API
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get("http://localhost:8000/api/countries/");
        setCountries(response.data.countries);
        setFilteredCountries(response.data.countries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // Dynamic filtering for search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentPage(1);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const selectedCountry = countries.find(
      (c) => c.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (selectedCountry && year) {
      navigate(`/results?country=${selectedCountry.code}&year=${year}`);
    } else {
      alert("Please enter a valid country and year.");
    }
  };

  // Handle clicking on a country card
  const handleCountryClick = (countryCode) => {
    navigate(`/results?country=${countryCode}&year=${year}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = filteredCountries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Explore Holiday Destinations</h1>
        <p className="text-lg mb-6">Discover beautiful holidays around the world.</p>

        {/* Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row justify-center gap-4 px-4"
        >
          <input
            type="text"
            placeholder="Search for a country"
            value={searchTerm}
            onChange={handleSearch}
            className="p-3 rounded border w-full md:w-1/3 text-black"
            required
          />
          <input
            type="number"
            placeholder="Enter Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-3 rounded border w-full md:w-1/4 text-black"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded hover:bg-yellow-500 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Country Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8 px-4">
        {currentCountries.map((country) => (
          <div
            key={country.code}
            onClick={() => handleCountryClick(country.code)}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={`/images/${country.code.toLowerCase()}.jpg`} // Dynamically show images
              alt={country.name}
              className="h-32 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{country.name}</h3>
            <p className="text-gray-600">
              Explore holidays in {country.name}.
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from(
          { length: Math.ceil(filteredCountries.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              } hover:bg-blue-500 transition`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
