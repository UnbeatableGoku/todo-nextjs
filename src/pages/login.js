import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast, Toaster } from 'react-hot-toast';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from 'src/validators/yupValidator';
const Login = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  const handleGoogleLogin = async () => {
    signIn('google', {
      callbackUrl: 'https://todo-nextjs-prathmesh.vercel.app',
      // callbackUrl: 'http://localhost:3000',
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const handleFormSubmit = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: 'https://todo-nextjs-prathmesh.vercel.app',
        // callbackUrl: 'http://localhost:3000',
      });
      if (result.ok) {
        toast.success('Login Successfully');
        router.push(result.url);
      } else {
        toast.error('Wrong Credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <section className='flex flex-col md:flex-row h-screen items-center'>
        <div className='bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen'>
          <img
            src='https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'
            alt=''
            width=''
            className='w-full h-full object-cover'
          />
        </div>

        <div
          className='bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center'
        >
          <div className='w-full h-100'>
            <h1 className='text-xl md:text-2xl font-bold leading-tight mt-12 text-black'>
              Log in to your account
            </h1>

            <form
              className='mt-6'
              action='#'
              method='POST'
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div>
                <label className='block text-gray-700'>Email</label>
                <input
                  type='text'
                  placeholder='Enter User Name'
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none focus:placeholder-black text-black'
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

              <div className='text-right mt-2'>
                <a
                  href='#'
                  className='text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700'
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type='submit'
                className='w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6'
              >
                Log In
              </button>
            </form>

            <hr className='my-6 border-gray-300 w-full' />

            <button
              type='button'
              className='w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300'
            >
              <div className='flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  className='w-6 h-6'
                  viewBox='0 0 48 48'
                >
                  <defs>
                    <path
                      id='a'
                      d='M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z'
                    />
                  </defs>
                  <clipPath id='b'>
                    <use xlinkHref='#a' overflow='visible' />
                  </clipPath>
                  <path clipPath='url(#b)' fill='#FBBC05' d='M0 37V11l17 13z' />
                  <path
                    clipPath='url(#b)'
                    fill='#EA4335'
                    d='M0 11l17 13 7-6.1L48 14V0H0z'
                  />
                  <path
                    clipPath='url(#b)'
                    fill='#34A853'
                    d='M0 37l30-23 7.9 1L48 0v48H0z'
                  />
                  <path
                    clipPath='url(#b)'
                    fill='#4285F4'
                    d='M48 48L17 24l-4-3 35-10z'
                  />
                </svg>
                <span className='ml-4' onClick={() => handleGoogleLogin()}>
                  Log in with Google
                </span>
              </div>
            </button>

            <Link href='/signup'>
              <p className='text-blue-500 hover:text-blue-700 font-semibold pt-4 cursor-pointer'>
                Need an account? <a>Create an account</a>
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

Login.getLayout = function ErrorLayout(page) {
  return (
    <>
      <Toaster />

      {page}
    </>
  );
};
export default Login;
