import React, { createContext, useContext, useEffect, useState } from "react";

type CryptoContextType = {
      currency: string;
      setCurrency: React.Dispatch<React.SetStateAction<string>>;
      symbol: string;
};

const Crypto = createContext<CryptoContextType | null>(null);

interface CryptoContextProps {
      children: React.ReactNode;
}

const CryptoContext: React.FC<CryptoContextProps> = ({ children }) => {
      const [currency, setCurrency] = useState<string>("INR");
      const [symbol, setSymbol] = useState<string>("₹");

      useEffect(() => {
            if (currency === "INR") setSymbol("₹");
            else if (currency === "USD") setSymbol("$");
      }, [currency]);

      const value = { currency, setCurrency, symbol };
      return <Crypto.Provider value={value}>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = () => {
      const context = useContext(Crypto);
      if (context === null) {
            throw new Error("useCryptoState must be used within a CryptoProvider");
      }
      return context;
};
