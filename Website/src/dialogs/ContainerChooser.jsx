import React from 'react'

const ContainerChooser = ({open, onClose, values, onSelect}) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Choose a Container</h2>
          <ul className="space-y-2">
            {values.map((value) => (
              <li key={value}>
                <button
                  className="w-full text-black py-2 px-4 rounded border-2 border-black hover:bg-gray-800 hover:text-white"
                  onClick={() => onSelect(value)}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
          <button 
            className="mt-4 w-full border-2 border-red-500 text-red-500 py-2 px-4 rounded hover:bg-red-500 hover:text-red-900"
            onClick={onClose}
          >
            Schließen
          </button>
        </div>
      </div>
    );
}

export default ContainerChooser