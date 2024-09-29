'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import { Refurbishment, RefurbContext } from "@/constants/types";

const refurbContext: React.Context<RefurbContext> = createContext<RefurbContext>(
  {
    listOfRefurb: null,
    updateListOfRefurb: () => {},
  }
);

export function useRefurbContext(): RefurbContext {
  const context = useContext(refurbContext);
  return context;
}

export const SAVProvider = (props: PropsWithChildren): JSX.Element => {
  const [listOfRefurb, updateListOfRefurb] = useState<Refurbishment[] | null>(null);

  return (
    <refurbContext.Provider value={{listOfRefurb, updateListOfRefurb}}>
      {props.children}
    </refurbContext.Provider>
  );
};
