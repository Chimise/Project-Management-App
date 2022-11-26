import Container from '../components/ui/Container';
import MobileLogo from '../components/common/MobileDrawer/MobileLogo';
import useMatchScreenSize from '../hooks/useMatchScreenSize';
import Link from 'next/link';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import Head from 'next/head';

const Home = () => {
  const isMatch = useMatchScreenSize();
 
  return (
    <div className='h-screen w-screen flex flex-col'>
      <Head>
        <title>Home Page</title>
        <meta name='description' content='Taskr Homepage' />
      </Head>
      <header>
        <Container className='flex items-center justify-between h-16'>
            <Link href='/'>
              <a>
              <MobileLogo collapsed={!isMatch} />
              </a>
            </Link>
            <nav className='flex items-center space-x-4'>
              <Link href='/auth/signin'>
              <a className='text-gray-700 text-sm px-3 py-1.5'>
                Sign In
              </a>
              </Link>
              <Link href='/auth/signup'>
                <a className='bg-primary text-sm text-white px-3 py-1.5 rounded-sm shadow-sm' >
                  Sign Up
                </a>
              </Link>
            </nav>
        </Container>
      </header>
      <main className='flex-1 pb-5'>
        <Container className='bg-[url("/background.jpg")] relative h-full bg-center bg-cover bg-no-repeat'>
          <div className='absolute inset-0 bg-black/80 flex items-center justify-center'>
            <div className='w-full max-w-2xl flex flex-col items-center space-y-3'>
              <div className='text-4xl md:text-5xl font-semibold text-center space-y-0.5'>
              <h2 className='text-white'>
                Manage your projects
              </h2>
              <h2 className='text-primary/70'>
                and create tasks
              </h2>
              </div>
              <p  className='text-sm tracking-wide text-center text-gray-300 px-3'>With taskr you can manage and breakdown your projects into smaller managable tasks that you can track easily as you progress, you can also create some sort of reminder by adding comment to your task.</p>
              <Link href='/auth/signup'>
                <a className='inline-flex items-center px-4 py-2 space-x-2 bg-teal-800 text-white'>
                    <span className='text-sm font-semibold'>
                      Get Started
                    </span>
                      <ArrowRightIcon className='w-3 h-3 shrink-0' />
                </a>
              </Link>
            </div>
          </div>
        </Container>  
      </main> 
    </div>
  )
}

export default Home;
