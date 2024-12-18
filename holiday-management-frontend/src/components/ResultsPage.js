import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const country = searchParams.get("country");
  const year = searchParams.get("year");

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // State for search bar inputs
  const [searchCountry, setSearchCountry] = useState(country || "");
  const [searchYear, setSearchYear] = useState(year || "");

  // Fetch holidays when country or year changes
  useEffect(() => {
    async function fetchHolidays() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/holidays/?country=${country}&year=${year}`
        );
        setHolidays(response.data.holidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      } finally {
        setLoading(false);
      }
    }
    if (country && year) fetchHolidays();
  }, [country, year]); // Re-fetch on country or year change

  // Handle new search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchCountry && searchYear) {
      // Update the URL with new search parameters
      setSearchParams({ country: searchCountry, year: searchYear });
    }
  };

  // Filter holidays by type, month, and date range
  let filteredHolidays = holidays;
  if (filterType) {
    filteredHolidays = filteredHolidays.filter((holiday) =>
      holiday.type.includes(filterType)
    );
  }

  if (selectedMonth) {
    filteredHolidays = filteredHolidays.filter((holiday) => {
      const holidayMonth = new Date(holiday.date).getMonth() + 1;
      return holidayMonth === parseInt(selectedMonth);
    });
  }

  if (startDate && endDate) {
    filteredHolidays = filteredHolidays.filter((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate >= startDate && holidayDate <= endDate;
    });
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search Bar Section */}
      <div className="bg-blue-600 text-white text-center py-6 mb-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Search for Holidays</h2>
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col md:flex-row justify-center gap-4 px-4"
        >
          <input
            type="text"
            placeholder="Enter Country Code (e.g., IN, US)"
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
            className="p-3 rounded border w-full md:w-1/3 text-black"
            required
          />
          <input
            type="number"
            placeholder="Enter Year"
            value={searchYear}
            onChange={(e) => setSearchYear(e.target.value)}
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

      {/* Filter Options */}
      <h1 className="text-3xl font-bold mb-4">
        Holidays in {country?.toUpperCase()} for {year}
      </h1>
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div>
          <label className="font-semibold mr-2">Filter by Holiday Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option value="National holiday">National Holiday</option>
            <option value="Religious holiday">Religious Holiday</option>
            <option value="Observance">Observance</option>
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Filter by Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold mr-2">Filter by Date Range:</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            isClearable
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* Holidays Table */}
      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredHolidays.length > 0 ? (
              filteredHolidays.map((holiday, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3 border">{holiday.name}</td>
                  <td className="p-3 border">{holiday.date}</td>
                  <td className="p-3 border">{holiday.type}</td>
                  <td className="p-3 border">{holiday.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No holidays found for the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;
