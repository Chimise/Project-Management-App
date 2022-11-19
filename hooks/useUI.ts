import { useContext } from "react";
import UIContext from "../store/UIContext";

const useUI = () => {
    const context = useContext(UIContext);
    if(!context) {
        throw new Error('Context not Initialized');
    }
    return context;
}

export default useUI;

