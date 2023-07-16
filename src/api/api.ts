import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import type { ICategories, ITask } from 'types/types';

const collectionUsers = 'users';
const collectionTasks = 'tasks';
const collectionCategories = 'categories';

const db = firestore();

// collection ref
export const usersColRef = db.collection(collectionUsers);
export const tasksColRef = db.collection(collectionTasks);
export const categoriesColRef = db.collection(collectionCategories);

// queries
export const queryTasks = (userId: string) => {
  return tasksColRef.where('userId', '==', userId);
};
// export const queryTasksCompleted = (userId: string) => {
//   return tasksColRef.where('isCompleted', '==', true).where('userId', '==', userId);
// };
// export const queryTasksInProgress = (userId: string) => {
//   return tasksColRef.where('isCompleted', '==', false).where('userId', '==', userId);
// };
// export const queryTasksByCategory = (userId: string, categoryId: string) => {
//   return tasksColRef.where('categoryId', '==', categoryId).where('userId', '==', userId);
// };
export const queryCategories = (userId: string) => {
  return categoriesColRef.where('userId', '==', userId);
};

export const queryUser = (userId: string) => {
  return usersColRef.where('userId', '==', userId);
};

// ##### AUTH ##### //

export function reAuthenticated(password: string) {
  const user = auth().currentUser;
  const cred = auth.EmailAuthProvider.credential(user?.email as string, password);
  return user?.reauthenticateWithCredential(cred);
}

// ##### TASKS ##### //

export async function addTask(newTask: ITask) {
  const task: ITask = {
    ...newTask,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  await firestore().collection('tasks').add(task);
}

export async function updateTask({ id, ...rest }: ITask) {
  await tasksColRef.doc(id).update({ updatedAt: new Date().toISOString(), ...rest });
}

export async function deleteTask(id: string) {
  await tasksColRef.doc(id).delete();
}

// ##### CATEGORIES ##### //

export async function addCategories({ name, userId }: ICategories) {
  const category: ICategories = {
    name,
    userId,
    createdAt: new Date().toISOString(),
  };
  await categoriesColRef.add(category);
}

export async function deleteCategory(id: string) {
  await categoriesColRef.doc(id).delete();
}

export async function deleteCategoryWithTasks(userId: string, categoryId: string) {
  await deleteCategory(categoryId);

  const tasksQuery = tasksColRef
    .where('categoryId', '==', categoryId)
    .where('userId', '==', userId);

  const querySnapshot = await tasksQuery.get();
  querySnapshot.forEach((taskDoc) => {
    const taskRef = tasksColRef.doc(taskDoc.id);
    taskRef.delete();
  });
}
