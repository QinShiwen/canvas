import { useState, useContext, createContext } from "react";
import axios from "axios";

interface userAccaunt {
  name: string;
  userid: string;
  email: string;
}

interface InfoContextValue {
  account: userAccaunt;
  setAccount: (account: userAccaunt) => void;
  registerPost: (email: string, username: string, password: string) => any;
  ifEmailExist: (email: string) => any;
  loginPost: (email: string, password: string) => any;
  logoutPost: () => void;
}

const infoContext = createContext<InfoContextValue>({} as InfoContextValue);

const useInfoContext = () => {
  const context = useContext(infoContext);
  return {
    ...context,
  };
};

const InfoProvider = ({ children }: any) => {
  const [account, setAccount] = useState<userAccaunt>({} as userAccaunt);

  const ifEmailExist = async (email: string) => {
    console.log(email);
    axios
      .post("http://localhost:5000/ifemailexist", { email: email })
      .then((res) => {
        if (res.data === "success") {
          return true;
        } else {
          return false;
        }
      });
    return false;
  };

  const autoLogin = async () => {};

  const registerPost = async (
    email: string,
    username: string,
    password: string
  ) => {
    axios
      .post("http://localhost:5000/register", {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "success") {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return false;
  };

  const loginPost = async (email: string, password: string) => {};

  const logoutPost = async () => {};

  const infoValue: InfoContextValue = {
    account,
    setAccount,
    registerPost,
    ifEmailExist,
    loginPost,
    logoutPost,
  };

  return <infoContext.Provider value={infoValue} />;
};

export { InfoProvider, useInfoContext };
