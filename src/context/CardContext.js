import React, { createContext, useContext, useState } from 'react';

import { v3CardPrototype } from '../utils/v3CardPrototype';

const CardContext = createContext();

const getInitialCardData = () => {
    const raw = localStorage.getItem("cardData");
    if (raw === null) return v3CardPrototype();
    try {
        const parsed = JSON.parse(raw);
        // Basic sanity check: must have spec and data fields
        if (parsed && typeof parsed === "object" && parsed.spec && parsed.data) {
            return parsed;
        }
        return v3CardPrototype();
    } catch (e) {
        console.error("Failed to parse stored card data, resetting to default:", e);
        localStorage.removeItem("cardData");
        return v3CardPrototype();
    }
};

export const CardProvider = ({ children }) => {
    const [cardData, setCardData] = useState(getInitialCardData);

    return (
        <CardContext.Provider value={{ cardData, setCardData }}>
            {children}
        </CardContext.Provider>
    );
};

export const useCard = () => {
    return useContext(CardContext);
};
