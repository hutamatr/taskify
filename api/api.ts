import { getAuth } from 'firebase/auth';
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
import type { ITaskSlice } from '../store/tasksSlice';
import type { ICategories, ITask } from '../types/types';

type Set<T> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean | undefined
) => void;

const collectionTasks = 'tasks';
const collectionCategories = 'categories';

// init services
const db = getFirestore();

// collection ref
const tasksColRef = collection(db, collectionTasks);
const categoriesColRef = collection(db, collectionCategories);

// queries
const queryTasks = firebaseQuery(tasksColRef);
const queryCompleted = firebaseQuery(tasksColRef, where('isCompleted', '==', true));
const queryInProgress = firebaseQuery(tasksColRef, where('isCompleted', '==', false));

const queryCategories = firebaseQuery(categoriesColRef);

// ##### AUTH ##### //

export function auth() {
  const auth = getAuth(app);
  return auth;
}

// ##### TASKS ##### //

export function getAllTasks(set: Set<ITaskSlice>) {
  return onSnapshot(
    queryTasks,
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
          tasks: (tasks as ITask[]).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        }),
        true
      );
    },
    (error) => {
      throw new Error(error.message);
    }
  );
}

export function getAllInProgress(set: Set<ITaskSlice>) {
  onSnapshot(
    queryInProgress,
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
          inProgressTasks: (tasks as ITask[]).sort((a, b) => +new Date(b.date) - +new Date(a.date)),
        }),
        true
      );
    },
    (error) => {
      throw new Error(error.message);
    }
  );
}

export function getAllCompleted(set: Set<ITaskSlice>) {
  onSnapshot(
    queryCompleted,
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

export function getAllCategories(set: Set<ICategoriesSlice>) {
  onSnapshot(
    queryCategories,
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
      throw new Error(error.message);
    }
  );
}

export async function addCategories({ name }: ICategories) {
  const categories: ICategories = {
    name,
    createdAt: new Date().toISOString(),
  };
  await addDoc(categoriesColRef, categories);
}

export function getAllTasksByCategory(selectedCategoryId: string, set: Set<ITaskSlice>) {
  onSnapshot(
    firebaseQuery(tasksColRef, where('categoryId', '==', selectedCategoryId)),
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
  onSnapshot(tasksQuery, (snapshot) => {
    snapshot.docs.forEach((taskDoc) => {
      const taskRef = doc(tasksColRef, taskDoc.id);
      deleteDoc(taskRef);
    });
  });
}
