"use client";

import { createContext, useContext, useCallback } from "react";

import { createNumberDispenser } from "@/lib/utils";

const NumberDispenserContext = createContext<() => number>(() => 0);

export const NumberDispenserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initNumberDispenser = useCallback(() => createNumberDispenser(), []);
  const dispense = initNumberDispenser();

  return (
    <NumberDispenserContext.Provider value={dispense}>
      {children}
    </NumberDispenserContext.Provider>
  );
};

export const useNumberDispenser = () => useContext(NumberDispenserContext);
