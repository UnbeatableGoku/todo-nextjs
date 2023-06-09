import { UserTask } from 'models/TaskSchema';

/**
 * Retrieves the task list of a user.
 *
 * @param {string} email - User's email.
 */
const getTaskService = async (email) => {
  try {
    const response = await UserTask.findOne({ email });
    if (response) {
      return response.task;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Deletes a task from the user's task list.
 *
 * @param {string} email - User's email.
 * @param {string} taskId - ID of the task to be deleted.
 */
const deleteTaskService = async (email, taskId) => {
  try {
    const result = await UserTask.findOneAndUpdate(
      { email },
      { $pull: { task: { _id: taskId } } },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
/**
 * Updates the status of a task.
 *
 * @param {string} email - User's email.
 * @param {string} taskId - ID of the task to be updated.
 * @param {string} newStatus - New status for the task.
 */
const updateTaskService = async (email, taskId, newStatus) => {
  try {
    const result = await UserTask.findOneAndUpdate(
      { email, 'task._id': taskId },
      { $set: { 'task.$.status': newStatus } },
      { new: true }
    );
    const updatedValue = result.task.find(
      (item) => item._id.toString() === taskId
    );
    return updatedValue;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getTaskService, deleteTaskService, updateTaskService };
