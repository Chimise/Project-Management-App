import React, {useEffect, Fragment} from 'react';
import {useRouter} from 'next/router';
import useAuth from '../../../hooks/useAuth';
import Spinner from '../../ui/Spinner'


interface AuthProps {
    children: React.ReactNode;
}

const Auth = ({children}: AuthProps) => {
    const {token, isLoading} = useAuth();
    const {replace} = useRouter()

    useEffect(() => {
        if(!token && !isLoading) {
            replace('/auth/signin');
        }
    }, [token, isLoading, replace])

    if(!token) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Spinner size='lg' />
        </div>
    }

    return <Fragment>
        {children}
    </Fragment>;
}

export default Auth;