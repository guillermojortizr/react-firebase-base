import { ReactNode, createContext, useContext, useState, useMemo } from "react";
import { GlobalContextActions, GlobalContextData, GlobalContextInterface } from "./interfaces";
import { auth } from "../../firebase/auth";

const initialGlobalContextData: GlobalContextData = {
  auth,
};

const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [globalContextData, setGlobalContextData] = useState(initialGlobalContextData);

  const actions: GlobalContextActions = {
    setGlobalContextData,
  };

  const value = useMemo(() => {
    return {
      globalContextData,
      actions,
    };
  }, [globalContextData, actions]);

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalContextProvider");
  }

  return context;
}
