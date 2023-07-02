import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query as firebaseQuery,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { ICategoriesSlice } from './../store/categoriesSlice';
import { app } from './firebase';
import type { IAuthSlice } from '../store/authSlice';
import type { ITaskSlice } from '../store/tasksSlice';
import type { IAuth, ICategories, ITask } from '../types/types';

type Set<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

const collectionTasks = 'tasks';
const collectionCategories = 'categories';

// init services
const db = getFirestore(app);

// init auth
export const auth = getAuth(app);

// console.log('userId api', { userId });

// collection ref
const tasksColRef = collection(db, collectionTasks);
const categoriesColRef = collection(db, collectionCategories);

// queries
// const queryTasks = firebaseQuery(tasksColRef, where('userId', '==', userId));
// const queryCompleted = firebaseQuery(
//   tasksColRef,
//   where('userId', '==', userId),
//   where('isCompleted', '==', true)
// );
// const queryInProgress = firebaseQuery(
//   tasksColRef,
//   where('userId', '==', userId),
//   where('isCompleted', '==', false)
// );

// const queryCategories = firebaseQuery(categoriesColRef, where('userId', '==', userId));

// ##### AUTH ##### //

export async function signUp({ userName, email, password }: IAuth, set: Set<IAuthSlice>) {
  const createUser = await createUserWithEmailAndPassword(auth, email, password);
  const user = createUser.user;
  await updateProfile(user, { displayName: userName });

  set({
    isLoading: false,
    userInfo: { email: user.email as string, uid: user.uid },
    isAuth: Boolean(user.uid),
  });
}

export async function signIn({ email, password }: IAuth, set: Set<IAuthSlice>) {
  const loginUser = await signInWithEmailAndPassword(auth, email, password);
  const user = loginUser.user;
  set({
    isLoading: false,
    userInfo: { email: user.email as string, uid: user.uid },
    isAuth: Boolean(user.uid),
  });
}

export async function logOut(set: Set<IAuthSlice>) {
  await signOut(auth);
  set({
    isLoading: false,
    userInfo: null,
    isAuth: false,
  });
}

// ##### TASKS ##### //

export function getAllTasks(userId: string, set: Set<ITaskSlice>) {
  return onSnapshot(firebaseQuery(tasksColRef, where('userId', '==', userId)), (snapshot) => {
    const tasks: unknown[] = [];
    snapshot.docs.forEach((doc) => {
      tasks.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    console.log('getAllTask', { tasks });
    set(
      (state) => ({
        ...state,
        isLoading: false,
        tasks: (tasks as ITask[]).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
      }),
      true
    );
  });
}

export function getAllInProgress(userId: string, set: Set<ITaskSlice>) {
  console.log('get all in progress', userId);
  return onSnapshot(
    firebaseQuery(tasksColRef, where('userId', '==', userId), where('isCompleted', '==', false)),
    (snapshot) => {
      const tasks: unknown[] = [];
      snapshot.docs.forEach((doc) => {
        tasks.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      set(
        (state) => ({
          ...state,
          isLoading: false,
          inProgressTasks:
            (tasks as ITask[]).sort((a, b) => +new Date(b.date) - +new Date(a.date)) || [],
        }),
        true
      );
    },
    (error) => {
      console.log('get all in progress error');
      throw new Error(error.message);
    }
  );
}

export function getAllCompleted(userId: string, set: Set<ITaskSlice>) {
  return onSnapshot(
    firebaseQuery(tasksColRef, where('userId', '==', userId), where('isCompleted', '==', true)),
    (snapshot) => {
      const tasks: unknown[] = [];
      snapshot.docs.forEach((doc) => {
        tasks.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      set(
        (state) => ({
          ...state,
          isLoading: false,
          completedTasks: tasks as ITask[],
        }),
        true
      );
    },
    (error) => {
      console.log('get all completed error');
      throw new Error(error.message);
    }
  );
}

export function getTask(taskId: string) {
  const docRef = doc(db, collectionTasks, taskId);
  return onSnapshot(docRef, (doc) => {
    return doc.data();
  });
}

export async function addTask(newTask: ITask) {
  const task: ITask = {
    ...newTask,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  await addDoc(tasksColRef, task);
}

export async function updateTask({ id, ...rest }: ITask) {
  const docRef = doc(db, collectionTasks, id as string);
  await updateDoc(docRef, { updatedAt: new Date().toISOString(), ...rest });
}

export async function deleteTask(id: string) {
  const docRef = doc(db, collectionTasks, id);
  await deleteDoc(docRef);
}

// ##### CATEGORIES ##### //

export function getAllCategories(userId: string, set: Set<ICategoriesSlice>) {
  return onSnapshot(
    firebaseQuery(categoriesColRef, where('userId', '==', userId)),
    (snapshot) => {
      const categories: unknown[] = [];
      snapshot.docs.forEach((doc) => {
        categories.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      set(
        (state) => ({
          ...state,
          isLoading: false,
          categories: (categories as ICategories[]).sort(
            (a, b) => +new Date(b.createdAt as string) - +new Date(a.createdAt as string)
          ),
        }),
        true
      );
    },
    (error) => {
      console.log('get all categories error');
      throw new Error(error.message);
    }
  );
}

export async function addCategories({ name, userId }: ICategories) {
  const categories: ICategories = {
    name,
    userId,
    createdAt: new Date().toISOString(),
  };
  await addDoc(categoriesColRef, categories);
}

export function getAllTasksByCategory(
  userId: string,
  selectedCategoryId: string,
  set: Set<ITaskSlice>
) {
  return onSnapshot(
    firebaseQuery(
      tasksColRef,
      where('userId', '==', userId),
      where('categoryId', '==', selectedCategoryId)
    ),
    (snapshot) => {
      const tasks: unknown[] = [];
      snapshot.docs.forEach((doc) => {
        tasks.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      set(
        (state) => ({
          ...state,
          isLoading: false,
          tasksByCategory: (tasks as ITask[]).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        }),
        true
      );
    },
    (error) => {
      console.log('get all tasks by categories error');
      throw new Error(error.message);
    }
  );
}

export async function deleteCategory(id: string) {
  const docRef = doc(categoriesColRef, id);
  await deleteDoc(docRef);
}

export async function deleteCategoryWithTasks(categoryId: string) {
  // Delete the category document
  await deleteCategory(categoryId);

  // Query and delete associated tasks
  const tasksQuery = firebaseQuery(tasksColRef, where('categoryId', '==', categoryId));
  return onSnapshot(tasksQuery, (snapshot) => {
    snapshot.docs.forEach((taskDoc) => {
      const taskRef = doc(tasksColRef, taskDoc.id);
      deleteDoc(taskRef);
    });
  });
}
