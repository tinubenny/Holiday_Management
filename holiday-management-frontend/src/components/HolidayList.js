import React from "react";

const HolidayList = ({ holidays, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {holidays.map((holiday, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(holiday)}
        >
          <h3 className="text-lg font-bold text-blue-500">{holiday.name}</h3>
          <p className="text-sm text-gray-700">{holiday.date.iso}</p>
          <p className="text-sm text-gray-500">{holiday.type.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
