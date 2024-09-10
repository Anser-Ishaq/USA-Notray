// IdContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const JobIdContext = createContext();

// Create a provider component
export const JobIdProvider = ({ children }) => {
    const [id, setId] = useState(null);

    // Function to set the ID
    const setIdHandler = (newId) => {
        setId(newId);
    };

    return (
        <JobIdContext.Provider value={{ id, setIdHandler }}>
            {children}
        </JobIdContext.Provider>
    );
};

// Custom hook to use the JobIdContext
export const useId = () => useContext(JobIdContext);
