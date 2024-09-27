'use client'
import { createContext, useContext, useState, PropsWithChildren } from "react";
import { Corner, CornerContext } from "@/constants/types";

const cornerContext: React.Context<CornerContext> = createContext<CornerContext>(
  {
    actualCorner: null,
    updateActualCorner: () => {},
  }
);

export function useCornerContext(): CornerContext {
  const context = useContext(cornerContext);
  return context;
}

export const CornerProvider = (props: PropsWithChildren): JSX.Element => {
  const [actualCorner, updateActualCorner] = useState<Corner | null>(null);

  return (
    <cornerContext.Provider value={{actualCorner, updateActualCorner}}>
      {props.children}
    </cornerContext.Provider>
  );
};
