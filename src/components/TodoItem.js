import React from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';

const TodoItem = ({ item, removeTodo, updateTodo }) => {
  let base = 4;
  let t = (d) => d * base;
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
    <div className='w-full p-4'>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: '100%',
          opacity: 1,
          transition: {
            type: 'spring',
            bounce: 0.3,
            opacity: { delay: t(0.025) },
          },
        }}
        transition={{
          duration: t(0.15),
          type: 'spring',
          bounce: 0,
          opacity: { delay: t(0.03) },
        }}
        exit={{ height: 0, opacity: 0 }}
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
        <p className='leading-relaxed text-base'>{item.description}</p>
      </motion.div>
    </div>
  );
};

export default React.memo(TodoItem);
