import React, { createContext, ReactNode, useState } from "react";

const defaultValue = {
  tripLength: 0,
  setTripLength: (value: number) => {},
  tripPax: "",
  setTripPax: (value: string) => {},
  tripInterests: [""],
  setTripInterests: (value: string[]) => {},
  tripBudget: 0,
  setTripBudget: (value: number) => {},
  tripPreferences: [""],
  setTripPreferences: (value: string[]) => {},
};

// Create Context Object
export const TripInputsContext = createContext(defaultValue);

// Create a provider for components to consume and subscribe to changes
export const TripInputsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tripLength, setTripLength] = useState<number>(0);
  const [tripPax, setTripPax] = useState<string>("");
  const [tripInterests, setTripInterests] = useState<string[]>([""]);
  const [tripBudget, setTripBudget] = useState<number>(0);
  const [tripPreferences, setTripPreferences] = useState<string[]>([""]);

  return (
    <TripInputsContext.Provider
      value={{
        tripLength,
        setTripLength,
        tripPax,
        setTripPax,
        tripInterests,
        setTripInterests,
        tripBudget,
        setTripBudget,
        tripPreferences,
        setTripPreferences,
      }}
    >
      {children}
    </TripInputsContext.Provider>
  );
};
