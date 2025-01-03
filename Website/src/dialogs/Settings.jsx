import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Settings = ({ open, onClose }) => {
    if (!open) return null;
    
    return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-1/4 h-3/5">
        <div className="flex h-10 justify-between items-center">
          <p className="font-bold text-xl">Settings</p>
          <button
          className="flex h-10 w-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-red-900 items-center justify-center"
          onClick={onClose}
        >
          X
        </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Settings;
