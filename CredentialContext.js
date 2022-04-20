import { createContext } from "react";

export const CredentialContext = createContext({
  storedCredential: {},
  setStoredCredential: () => {},
});
