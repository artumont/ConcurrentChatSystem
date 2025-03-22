'use client'

import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

interface PopupsContextType {
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
}

export const PopupsContext = createContext<PopupsContextType>({
    showError: () => { },
    showSuccess: () => { },
});

export const PopupsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const showError = (message: string) => {
        toast.error(message, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "#181818",
                color: "#b8b8b8",
                fontSize: "16px",
                padding: "16px",
                borderRadius: "8px",
            },
            iconTheme: {
                primary: "#ff3535",
                secondary: "#00FF00",
            },
        });
    }

    const showSuccess = (message: string) => {
        toast.success(message, {
            duration: 3000,
            position: "top-right",
            style: {
                background: "#181818",
                color: "#b8b8b8",
                fontSize: "16px",
                padding: "16px",
                borderRadius: "8px",
            },
            iconTheme: {
                primary: "#272727",
                secondary: "#00FF00",
            },
        });
    }

    return (
        <PopupsContext.Provider value={{ showError, showSuccess }}>
            {children}
        </PopupsContext.Provider>
    );
}

export const usePopups = () => {
    const context = useContext(PopupsContext);
    if (!context) {
        throw new Error("usePopups must be used within a PopupsProvider");
    }
    return context;
}