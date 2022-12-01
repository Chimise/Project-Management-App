import React from 'react';

const DashboardFooter = () => {
    const year = new Date().getFullYear();
    return (<footer className='text-center px-6 pb-4 md:p-4 my-2 text-slate-700 text-sm'>
        Taskr was created by <span className='text-black font-semibold underline'>Chimise</span>, Copyright @ {year}. All right reserved
    </footer>)
}

export default DashboardFooter;