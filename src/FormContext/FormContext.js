// FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useForm = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        clientInfo: {},
        signerInfo: {},
        schedule: {},
        jobDocs: {}
    });

    const updateFormData = (step, data) => {
        console.log("Updating form data for step:", step, data);
    
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [step]: data instanceof File ? data : {  
                    ...prevData[step], 
                    ...data,
                },
            };
    
            console.log("Updated formData state:", updatedData);
            return updatedData;
        });
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};
