import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import useTodo from 'src/hooks/useTodo';
function Todo() {
  const [todoList, setTodoList] = useState([]);
  const {
    session,
    status,
    handleSubmit,
    register,
    router,
    handleTaskSubmit,
    fetchTodoList,
    removeTodo,
    updateTodo,
    errors,
  } = useTodo({ todoList, setTodoList });

  useEffect(() => {
    fetchTodoList();
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }
  const getBorderColor = (status) => {
    if (status === 'pending') {
      return ' border-4 border-yellow-500 shadow-yellow-400';
    } else if (status === 'ongoing') {
      return 'border-4 border-blue-500 shadow-blue-400';
    } else if (status === 'completed') {
      return 'border-4 border-green-400 shadow-green-400';
    } else {
      return 'border-4 border-purple-400 shadow-purple-400';
    }
  };

  return (
    <div className=' px-5 mx-auto text-gray-400 bg-gray-700 '>
      <div className='font-extrabold text-4xl text-center pt-2'>
        <div>Add TODO</div>
      </div>
      <section className='text-gray-400 body-font'>
        <div className='container px-5 py-24 mx-auto '>
          <div className='flex flex-col sm:flex-row  justify-center items-center  mb-20 max-w-xl p-10 m-auto   border-slate-100 hover:shadow-2xl transition duration-1000 rounded-3xl  hover:shadow-zinc-100 cursor-pointer  ='>
            <form onSubmit={handleSubmit(handleTaskSubmit)}>
              <div>
                <div className='pb-4'>
                  <input
                    className='bg-transparent border-b p-2 '
                    placeholder='Title'
                    {...register('title')}
                  ></input>
                  <ErrorMessage
                    name='title'
                    errors={errors}
                    render={({ message }) => (
                      <p className='text-sm pt-1 text-red-400'>{message}</p>
                    )}
                  ></ErrorMessage>
                </div>
                <div className='pt-4'>
                  <input
                    className='bg-transparent border-b p-2 '
                    placeholder='Description'
                    {...register('description')}
                  ></input>
                  <ErrorMessage
                    name='description'
                    errors={errors}
                    render={({ message }) => (
                      <p className='text-sm pt-1 text-red-400'>{message}</p>
                    )}
                  ></ErrorMessage>
                </div>
              </div>
              <div className='pt-4 '>
                <button className='border-2 p-2 w-full hover:bg-slate-100 hover:text-slate-800 shadow-md shadow-orange-50'>
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
          <div className='grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
            {todoList &&
              todoList.length > 0 &&
              todoList.map((item) => (
                <div className='w-full p-4'>
                  <div
                    className={`border border-gray-100 shadow-xl  p-6 rounded-lg transition duration-500 bg-slate-800 ${getBorderColor(
                      item.status
                    )}`}
                  >
                    <div className='w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4'>
                      <svg
                        fill='none'
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        className='w-6 h-6'
                        viewBox='0 0 24 24'
                      >
                        <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                      </svg>
                    </div>
                    <div className='flex items-center justify-between pb-3 ps-1'>
                      <div className='relative'>
                        <select
                          onChange={(e) =>
                            updateTodo(item._id, e.target.value, item.status)
                          }
                          defaultValue={item.status}
                          className='transiton appearance-none rounded border border-gray-700 bg-transparent py-2 pl-3 pr-10 text-sm text-white duration-300 hover:bg-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-900'
                        >
                          <option
                            className='bg-gray-800 text-gray-200'
                            value='pending'
                            selected={item.status === 'pending'}
                          >
                            Pending
                          </option>
                          <option
                            className='bg-gray-800 text-gray-200'
                            value='completed'
                            selected={item.status === 'completed'}
                          >
                            Completed
                          </option>
                          <option
                            className='bg-gray-800 text-gray-200'
                            value='onGoing'
                            selected={item.status === 'onGoing'}
                          >
                            OnGoing
                          </option>
                        </select>
                        <span className='pointer-events-none absolute right-2 top-2 flex w-6 items-center justify-center text-center text-gray-600'>
                          <svg
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            className='h-4 w-4'
                            viewBox='0 0 24 24'
                          >
                            <path d='M6 9l6 6 6-6' />
                          </svg>
                        </span>
                      </div>
                      {item && item.status && item.status === 'completed' && (
                        <button
                          onClick={() => removeTodo(item._id)}
                          className='transiton ms-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-700 text-xl text-red-500 duration-300 hover:bg-red-500 hover:text-gray-100'
                        >
                          <AiTwotoneDelete />
                        </button>
                      )}
                    </div>
                    <h2 className='text-lg text-gray-200 font-medium title-font mb-2'>
                      {item.title}
                    </h2>
                    <p className='leading-relaxed text-base'>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Todo;
