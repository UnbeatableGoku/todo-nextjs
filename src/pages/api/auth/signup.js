import { hash } from 'bcrypt';
import connectMongo from 'database/config';
import Users from 'models/Schema';
export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error }));

  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    if (!req.body) {
      res.status(404).json({ error: "Don't Have Form Data" });
    }

    const checkexsiting = await Users.findOne({ email });
    if (checkexsiting) {
      return res.status(409).json({ message: 'User Already Exists...!' });
    }

    const newUser = await Users.create({
      username,
      email,
      password: await hash(password, 10),
    });
    res.status(200).json({ message: true });
  } else {
    res
      .status(500)
      .json({ message: 'HTTP method is not valid only post accepted' });
  }
}
