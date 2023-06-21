import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query as firebaseQuery,
  updateDoc,
} from 'firebase/firestore';

import { app } from './firebase';
import { ITask } from '../types/types';

const collectionName = 'tasks';
// init services
const db = getFirestore();
// collection ref
const colRef = collection(db, collectionName);
// queries
const query = firebaseQuery(colRef);

export function auth() {
  const auth = getAuth(app);
  return auth;
}

export function getAllTasks() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tasks: any[] = [];
  onSnapshot(query, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      tasks.push({
        ...doc.data(),
        id: doc.id,
      });
    });
  });
  return tasks;

  // getDocs(colRef)
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       tasks.push({ ...doc.data(), id: doc.id });
  //     });
  //   })
  //   .catch((err) => {
  //     return err;
  //   });
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

export function updateTask({ id, ...rest }: ITask) {
  const docRef = doc(db, collectionName, id as string);
  updateDoc(docRef, { updatedAt: new Date().toISOString(), ...rest });
}

export async function deleteTask(id: string) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
