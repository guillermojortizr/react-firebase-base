import React, { Dispatch, SetStateAction } from "react";
import { Auth, User } from "firebase/auth";

export interface GlobalContextData {
  auth: Auth;
}

export interface GlobalContextActions {
  setGlobalContextData: Dispatch<SetStateAction<GlobalContextData>>;
}

export interface GlobalContextInterface {
  globalContextData: GlobalContextData;
  actions: GlobalContextActions;
}
