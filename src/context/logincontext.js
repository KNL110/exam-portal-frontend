import { createContext, useContext } from "react";


export const LoginContext = createContext({
    user: null
});

export const LoginProvider = LoginContext.Provider;

export default function useLogin() {
    return useContext(LoginContext);
}