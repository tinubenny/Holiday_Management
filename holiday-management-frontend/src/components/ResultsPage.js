import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ResultsPage = () => {
  const [searchParams] = useSearchParams();
  const country = searchParams.get("country");
  const year = searchParams.get("year");

  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:8000/api/spots/?country=${country}&year=${year}`
      );
      setSpots(response.data.spots);
      setLoading(false);
    }
    fetchData();
  }, [country, year]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Top Spots in {country.toUpperCase()}</h1>
      <div className="mb-4">
        <label className="font-semibold mr-2">Select Date Range:</label>
        <DatePicker
          selectsRange={true}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          onChange={(update) => setDateRange(update)}
          isClearable
          className="p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {spots.map((spot, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={spot.image}
              alt={spot.name}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold">{spot.name}</h3>
            <p>{spot.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
