import React, {useRef} from 'react';
import Container from '../../../components/ui/Container';
import DashboardTitle from '../../../components/common/DashboardTitle';
import DashboardHeader from '../../../components/common/DashboardHeader';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import useProjects from '../../../hooks/useProjects';
import { useRouter } from 'next/router';
import ProjectCard from '../../../components/common/ProjectCard';


const AddProjectPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const {addProject, projects} = useProjects();
    const addProjectHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = inputRef.current?.value;
        if(!name) {
            return;
        };
        const id = addProject(name);
        router.push({pathname: '/dashboard/projects/[id]', query: {
            id
        }});
        
    }
    return (<Container>
        <DashboardHeader title="Projects" />
        <DashboardTitle className='mt-8' icon='project' title="Projects" />

        <form onSubmit={addProjectHandler} className='flex flex-col items-start space-y-3 md:space-y-0 sm:px-2 md:flex-row mt-6 md:items-end md:space-x-4 md:px-6'>
            <Input ref={inputRef} placeholder='Create A project' />
            <Button>Create Project</Button>
        </form>
        <div className='mt-16 space-y-4 sm:space-y-0 sm:flex sm:flex-wrap sm:-mx-3'>
            {projects.map(project => (
                <div key={project.id} className='w-full sm:p-3 sm:w-1/2 lg:w-1/3'>
                    <ProjectCard className='h-48 w-full sm:w-auto' project={project} />
                </div>
            ))}
        </div>
    </Container>)
}

export default AddProjectPage;