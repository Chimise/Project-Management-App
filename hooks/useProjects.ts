import { useContext } from "react";
import { TaskContext } from "../store/TaskContext";

const useProjects = () => {
    const ctx = useContext(TaskContext);
    if(!ctx) throw new Error("The Provider has not been wrapped");

    return ctx;
}

export default useProjects;