import { useContext } from "react";
import {AuthContext} from "../store/AuthContext";

const useAuth = ()  => {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("Auth context not avialable");
    }

    return ctx;
}

export default useAuth;