// src/components/StarsContext.tsx
import { createContext, useContext, useState } from "react";

interface StarsContextType {
  stars: number;
  setStars: (value: number) => void;
}

const StarsContext = createContext<StarsContextType>({
  stars: 0,
  setStars: () => {},
});

export const StarsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stars, setStars] = useState<number>(0);
  return (
    <StarsContext.Provider value={{ stars, setStars }}>
      {children}
    </StarsContext.Provider>
  );
};

export const useStarsContext = () => useContext(StarsContext);
