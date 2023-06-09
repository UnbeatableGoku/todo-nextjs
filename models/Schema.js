const { Schema, models, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials',
  },
});

const Users = models.User || model('User', userSchema);

export default Users;
