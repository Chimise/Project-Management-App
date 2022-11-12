import { useCallback, useMemo} from "react";
import useProjects from "./useProjects";

const useTaskStatus = () => {
    const {projects} = useProjects();
    
    const getStatus = useCallback((id: string) => {
        const project = projects.find(project => project.id === id);
        const status = {
            created: 0,
            progress: 0,
            completed: 0
        }
        if(!project || project.tasks.length === 0) {
            return status;
        }
        project.tasks.forEach(task => {
            if(task.status === 0) {
                status['created'] += 1;
            }else if(task.status === 1) {
                status['progress'] += 1;
            }else {
                status['completed'] += 1;
            }
        })
        return status;
    }, [projects])

    return getStatus;
}

export default useTaskStatus;