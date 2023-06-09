import { deleteTaskService, updateTaskService } from '@services/todoServices';
import connectMongo from 'database/config';
import { UserTask } from 'models/TaskSchema';
import { getToken } from 'next-auth/jwt';
export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return res.status(401).json({ error: 'unAuthorized User', ok: false });
  }
  if (req.method === 'DELETE') {
    const { email } = token;
    const { todoId } = req.query;
    try {
      const updatedTask = await deleteTaskService(email, todoId);
      if (updatedTask) {
        res.status(200).json({ response: updatedTask, message: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
  if (req.method === 'PUT') {
    const { email } = token;
    const { todoId } = req.query;
    const { newStatus } = req.body;
    try {
      const updatedTask = await updateTaskService(email, todoId, newStatus);
      if (updatedTask) {
        res.status(200).json({ response: updatedTask, message: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
