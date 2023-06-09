import { deleteTaskService, getTaskService } from '@services/todoServices';
import connectMongo from 'database/config';
import { UserTask } from 'models/TaskSchema';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  if (!token) {
    return res.status(401).json({ error: 'unAuthorized User', ok: false });
  }
  if (req.method === 'POST') {
    console.log(req.body);
    const {
      response: { title },
      response: { description },
    } = req.body;
    const newTask = { title: title, description: description };
    const email = token.email;
    if (!req.body) {
      res.status(404).json({ error: "Don't Have Form Data" });
    }

    //check exsiting task schema
    const exsitingTask = await UserTask.findOne({ email });

    if (!exsitingTask) {
      const result = await UserTask.create({ email });
      if (result.task.length === 0) {
        result.task.push(newTask);
        result.save();
        return result;
      }
      res.status(200).json({ response: result });
    } else {
      exsitingTask.task.push(newTask);
      exsitingTask.save();
      const lastValue = exsitingTask.task[exsitingTask.task.length - 1];
      return res.status(200).json({ response: lastValue });
    }
  }

  if (req.method === 'GET') {
    const { email } = token;
    try {
      const userTaskData = await getTaskService(email);
      if (userTaskData.length > 0) {
        res.status(200).json({ response: userTaskData });
      } else {
        res.status(404).json({ error: 'no task found ' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
