import React from "react";

const HolidayList = ({ holidays }) => {
  return (
    <ul className="space-y-4">
      {holidays.map((holiday, index) => (
        <li
          key={index}
          className="p-4 border rounded-md shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold">{holiday.name}</h3>
          <p>
            <strong>Date:</strong> {holiday.date}
          </p>
          <p>
            <strong>Type:</strong> {holiday.type}
          </p>
          <p>
            <strong>Description:</strong> {holiday.description || "N/A"}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default HolidayList;
