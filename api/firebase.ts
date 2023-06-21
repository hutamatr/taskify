import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDAP7xvrD73UtER_xq9eNRiYsl1uDUujMQ',
  authDomain: 'task-manager-app-7306a.firebaseapp.com',
  projectId: 'task-manager-app-7306a',
  storageBucket: 'task-manager-app-7306a.appspot.com',
  messagingSenderId: '228430311363',
  appId: '1:228430311363:web:36018beec2f9095553d776',
  measurementId: 'G-07TM0F6Z7P',
};

export const app = initializeApp(firebaseConfig);
