import TodoItem from '@components/TodoItem';
import { ErrorMessage } from '@hookform/error-message';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
            <AnimatePresence initial={false}>
              {todoList &&
                todoList.length > 0 &&
                todoList.map((item) => (
                  <TodoItem
                    item={item}
                    key={item._id}
                    updateTodo={updateTodo}
                    removeTodo={removeTodo}
                  />
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Todo;
