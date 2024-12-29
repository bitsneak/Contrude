import React, { useState } from "react";
import DetailControl from "../components/DetailControl";

const DialogComponent = ({ open, onClose, values, onSelect }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Wähle eine Zahl</h2>
        <ul className="space-y-2">
          {values.map((value) => (
            <li key={value}>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => onSelect(value)}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
        <button 
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Schließen
        </button>
      </div>
    </div>
  );
};

const TestingPage = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setDialogOpen(false);

    // Basierend auf der ausgewählten Zahl navigieren
    switch (value) {
      case 1:
        alert('Navigiere zu Seite 1');
        break;
      case 2:
        alert('Navigiere zu Seite 2');
        break;
      default:
        alert(`Navigiere zu Seite für Zahl ${value}`);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Testing Page</h1>
      <button 
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={handleOpenDialog}
      >
        Dialog öffnen
      </button>
      <DialogComponent
        open={isDialogOpen}
        onClose={handleCloseDialog}
        values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} // Liste von Werten
        onSelect={handleSelect}
      />
      {selectedValue && <p className="mt-4 text-lg">Ausgewählte Zahl: {selectedValue}</p>}
    </>
  );
};

export default TestingPage;
