
import { useState } from "react";

interface userAccaunt {
    name: string;
    userid: string;
    email: string;
}

interface ContextValue {
    account: userAccaunt;
    setAccount: (account: userAccaunt) => void;
}

