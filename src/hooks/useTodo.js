import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { taskSchema } from 'src/validators/yupValidator';

const useTodo = ({ todoList, setTodoList }) => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(taskSchema) });
  const router = useRouter();

  const handleTaskSubmit = useCallback(
    async (response) => {
      try {
        const { data } = await axios.post('/api/task', {
          response,
        });
        if (data.response) {
          let updatedTodo = [...todoList, { ...data.response }];
          setTodoList(updatedTodo);
          toast.success('Task Added');
        }
      } catch (error) {
        console.log(error);
      }
    },
    [todoList]
  );

  const fetchTodoList = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/task');
      if (data.response.length > 0) {
        setTodoList(data.response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [todoList]);

  const removeTodo = useCallback(
    async (id) => {
      try {
        const { data } = await axios.delete(`/api/${id}`);
        if (data.message === true) {
          const updatedTodo = todoList.filter((item) => item._id !== id);
          setTodoList(updatedTodo);
          toast.success('Remove Successfully');
        }
      } catch (error) {
        console.log(error);
      }
    },
    [todoList]
  );

  const updateTodo = useCallback(
    async (id, newStatus, oldStatus) => {
      console.log(oldStatus);
      try {
        const { data } = await axios.put(`/api/${id}`, {
          newStatus,
        });
        if (data.message === true) {
          const updatedTodoList = todoList.map((item) => {
            if (item._id === id) {
              return { ...item, status: newStatus };
            }
            return item;
          });
          console.log(updatedTodoList);
          setTodoList(updatedTodoList);
        }
      } catch (error) {
        const updatedTodoList = todoList.map((item) => {
          if (item._id === id) {
            return { ...item, status: oldStatus };
          }
          return item;
        });
        setTodoList(updatedTodoList);
      }
    },
    [todoList]
  );

  return {
    session,
    status,
    handleSubmit,
    register,
    router,
    handleTaskSubmit,
    todoList,
    fetchTodoList,
    removeTodo,
    updateTodo,
    errors,
  };
};

export default useTodo;
