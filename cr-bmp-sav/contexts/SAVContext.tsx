'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import { SAV, SAVContext } from "@/constants/types";

const savContext: React.Context<SAVContext> = createContext<SAVContext>(
  {
    listOfSAV: null,
    updateListOfSAV: () => {},
  }
);

export function useSAVContext(): SAVContext {
  const context = useContext(savContext);
  return context;
}

export const SAVProvider = (props: PropsWithChildren): JSX.Element => {
  const [listOfSAV, updateListOfSAV] = useState<SAV[] | null>(null);

  return (
    <savContext.Provider value={{listOfSAV, updateListOfSAV}}>
      {props.children}
    </savContext.Provider>
  );
};
