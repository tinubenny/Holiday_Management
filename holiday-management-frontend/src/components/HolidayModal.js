import React from "react";

const HolidayModal = ({ holiday, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">{holiday.name}</h2>
        <p className="mb-2">
          <strong>Date:</strong> {holiday.date.iso}
        </p>
        <p className="mb-2">
          <strong>Type:</strong> {holiday.type.join(", ")}
        </p>
        <p className="mb-4">
          <strong>Description:</strong> {holiday.description || "No description available."}
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HolidayModal;
