const { default: Users } = require('models/Schema');

const userService = async ({ username, email, provider, password }) => {
  try {
    const result = await Users.create({ username, email, provider, password });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export default userService;
