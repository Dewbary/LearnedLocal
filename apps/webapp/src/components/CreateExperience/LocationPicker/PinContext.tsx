import React, { createContext, useContext, useState } from "react";

type PinContextType = {
  pinMode: boolean;
  togglePinMode: () => void;
};

const PinContext = createContext<PinContextType | null>(null);

export const usePinContext = () => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error("usePinContext must be used within a PinContextProvider");
  }
  return context;
};

type PinContextProviderProps = {
  children: React.ReactNode;
};

export const PinContextProvider = ({ children }: PinContextProviderProps) => {
  const [pinMode, setPinMode] = useState(false);
  const togglePinMode = () => setPinMode((prev) => !prev);

  return (
    <PinContext.Provider value={{ pinMode, togglePinMode }}>
      {children}
    </PinContext.Provider>
  );
};
