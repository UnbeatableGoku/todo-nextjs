import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { singupSchema } from 'src/validators/yupValidator';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSession } from 'next-auth/react';
const SignUp = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(singupSchema),
  });
  const handleFormSubmit = async (data) => {
    console.log(data);
    try {
      const option = {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(data),
      };

      const result = await fetch('/api/auth/signup', option);
      console.log(result);
      if (result.ok) {
        toast('User Created Successfully');
        // router.push('https://todo-nextjs-prathmesh.vercel.app/login');
        router.push('http://localhost:3000/login');
      } else {
        toast.error('User Already Exist');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section className='flex flex-col md:flex-row h-screen items-center z-0'>
        <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
          <img
            src='https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
            alt=''
            className='w-full h-full object-cover'
          />
        </div>

        <div
          className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center  sm:justify-center'
        >
          <div className='w-full h-100'>
            <h1 className='text-xl md:text-2xl font-bold leading-tight text-black'>
              Sign up
            </h1>

            <form className='mt-6' onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                <label className='block text-gray-700'>User Name</label>
                <input
                  type='text'
                  placeholder='Enter User Name'
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:placeholder-black text-black focus:bg-white  focus:outline-none  '
                  {...register('username')}
                />
                <ErrorMessage
                  name='username'
                  errors={errors}
                  render={({ message }) => (
                    <p className='text-sm pt-1 text-red-600'>{message}</p>
                  )}
                ></ErrorMessage>
              </div>
              <div className='mt-4'>
                <label className='block text-gray-700'>Email</label>
                <input
                  type='text'
                  placeholder='Enter Email'
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white
                  focus:placeholder-black text-black focus:outline-none'
                  {...register('email')}
                />
                <ErrorMessage
                  name='email'
                  errors={errors}
                  render={({ message }) => (
                    <p className='text-sm pt-1 text-red-600'>{message}</p>
                  )}
                ></ErrorMessage>
              </div>
              <div className='mt-4'>
                <label className='block text-gray-700'>Password</label>
                <input
                  type='password'
                  placeholder='Enter Password'
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none focus:placeholder-black text-black'
                  {...register('password')}
                />
                <ErrorMessage
                  name='password'
                  errors={errors}
                  render={({ message }) => (
                    <p className='text-sm pt-1 text-red-600'>{message}</p>
                  )}
                ></ErrorMessage>
              </div>
              {/* <div className='mt-4'>
                <label className='block text-gray-700'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='Enter Confirm Password'
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none'
                  {...register('conpassword')}
                />
                <ErrorMessage
                  name='conpassword'
                  errors={errors}
                  render={({ message }) => (
                    <p className='text-sm pt-1 text-red-600'>{message}</p>
                  )}
                ></ErrorMessage>
              </div> */}

              <button
                type='submit'
                className='w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6'
              >
                Sign Up
              </button>
            </form>

            <hr className='my-6 border-gray-300' />

            <Link href='/login'>
              <p className='mt-8 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer'>
                Already have an account?
                <a>Login</a>
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

SignUp.getLayout = function ErrorLayout(page) {
  return (
    <>
      <Toaster />
      {page}
    </>
  );
};
export default SignUp;
