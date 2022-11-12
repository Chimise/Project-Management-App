import { useContext } from "react";
import { InfoContext } from "../store/InfoContext";

const useInfo = () => {
    const ctx = useContext(InfoContext);
    if(!ctx) {
        throw new Error("Info context not available");
    }

    return ctx;
}

export default useInfo;