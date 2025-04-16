import React, { createContext, useState, useContext } from "react";

const SplashContext = createContext();

export function SplashProvider({ children }) {
    const [hasSeenSplash, setHasSeenSplash] = useState(false);

    return (
        <SplashContext.Provider value={{ hasSeenSplash, setHasSeenSplash }}>
            {children}
        </SplashContext.Provider>
    );
}

export function useSplash() {
    return useContext(SplashContext);
}
