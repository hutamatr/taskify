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

import { app } from './firebase';
import { ITaskSlice } from '../store/tasksSlice';
import { ITask } from '../types/types';

type Set = (
  partial:
    | ITaskSlice
    | Partial<ITaskSlice>
    | ((state: ITaskSlice) => ITaskSlice | Partial<ITaskSlice>),
  replace?: boolean | undefined
) => void;

const collectionName = 'tasks';
// init services
const db = getFirestore();
// collection ref
export const colRef = collection(db, collectionName);
// queries
export const query = firebaseQuery(colRef);
const queryCompleted = firebaseQuery(colRef, where('isCompleted', '==', true));
const queryInProgress = firebaseQuery(colRef, where('isCompleted', '==', false));

export function auth() {
  const auth = getAuth(app);
  return auth;
}

export function getAllTasks(set: Set) {
  return onSnapshot(
    query,
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

export function getAllInProgress(set: Set) {
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

export function getAllCompleted(set: Set) {
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
  const docRef = doc(db, collectionName, taskId);
  return onSnapshot(docRef, (doc) => {
    return doc.data();
  });
}

export async function addTask({ title, description, date }: ITask) {
  const task: ITask = {
    title,
    description,
    date,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: null,
  };
  await addDoc(colRef, task);
}

export async function updateTask({ id, ...rest }: ITask) {
  const docRef = doc(db, collectionName, id as string);
  await updateDoc(docRef, { updatedAt: new Date().toISOString(), ...rest });
}

export async function deleteTask(id: string) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
