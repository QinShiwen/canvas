
import { useState,useContext,createContext } from "react";
import axios from "axios";

interface userAccaunt {
    name: string;
    userid: string;
    email: string;
}

interface InfoContextValue {
    account: userAccaunt;
    setAccount: (account: userAccaunt) => void;
    registerPost: () => void;
    loginPost: () => void;
    logoutPost: () => void;
}

const infoContext = createContext<userAccaunt>(
    {} as userAccaunt
)

const useInfoContext = () =>{
    const context = useContext(infoContext);
    return {
        ...context,
    }
}

const InfoProvider = ({children}:any) => {
    const [account, setAccount] = useState<userAccaunt>(
        {} as userAccaunt
    );

    const registerPost = async () => {

    
    }

    const loginPost = async () => {
    
    }

    const logoutPost = async () => {
    
    }

    const infoValue:InfoContextValue = {
        account,
        setAccount,
        registerPost,
        loginPost,
        logoutPost,
    }

    return (
       {/* <infoContext.Provider value={infoValue} />*/}
    )
}