import React, {useRef} from 'react';
import Head from 'next/head';
import Container from '../../../components/ui/Container';
import DashboardTitle from '../../../components/common/DashboardTitle';
import DashboardHeader from '../../../components/common/DashboardHeader';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import useProjects from '../../../hooks/useProjects';
import ProjectCard from '../../../components/common/ProjectCard';
import Loading from '../../../components/common/Loading';
import useAddProject from '../../../hooks/useAddProject';
import Error from '../../../components/common/Error';


const AddProjectPage = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {projects, isLoading, mutate, error} = useProjects();
    const {sendRequest} = useAddProject();
    const addProjectHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = inputRef.current?.value;
        if(!name) {
            return;
        };
        await sendRequest({name});
    }
    return (<Container>
        <DashboardHeader title="Projects" />
        <DashboardTitle className='mt-8' icon='project' title="Projects" />
        <Head>
        <title>Add Project</title>
        <meta name='author' content='Chisom Promise' />
        <meta name='description' content='Add new Projects or View created projects' />
      </Head>
        <form onSubmit={addProjectHandler} className='flex flex-col items-start space-y-3 md:space-y-0 sm:px-2 md:flex-row mt-6 md:items-end md:space-x-4 md:px-6'>
            <Input ref={inputRef} placeholder='Create A project' />
            <Button>Create Project</Button>
        </form>
        <div className='mt-16 space-y-5 sm:space-y-0 sm:flex sm:flex-wrap sm:-mx-3'>
            {isLoading && <Loading className='h-40' />}
            {projects && projects.map(project => (
                <div key={project.id} className='w-full sm:p-3 sm:w-1/2 lg:w-1/3'>
                    <ProjectCard className='h-48 w-full sm:w-auto' project={project} />
                </div>
            ))}
            {error && <Error className='h-40' onRetry={() => mutate()} />}
        </div>
    </Container>)
}

AddProjectPage.isAuth = true;

export default AddProjectPage;