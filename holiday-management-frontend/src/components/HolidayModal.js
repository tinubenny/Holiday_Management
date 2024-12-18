import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const HolidayModal = ({ holiday, onClose }) => {
  if (!holiday) return null;

  return (
    <Modal
      isOpen={!!holiday}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-500">{holiday.name}</h2>
      <p>
        <strong>Date:</strong> {holiday.date.iso}
      </p>
      <p>
        <strong>Type:</strong> {holiday.type.join(", ")}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {holiday.description || "No description available"}
      </p>
      <button
        onClick={onClose}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </Modal>
  );
};

export default HolidayModal;
