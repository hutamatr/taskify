import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

export interface ITask {
  id?: string;
  author: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategories {
  id?: string;
  name: string;
}

export type RootStackParamList = {
  Home: undefined;
  Categories: undefined;
  Account: undefined;
  Tasks: undefined;
  CreateTask: undefined;
  HomeTabs: undefined;
};

// export type RootStackParamListTabs = {
//   Home: undefined;
//   CategoryStack: undefined;
//   AccountStack: undefined;
//   AllTasksStack: undefined;
// };

export type HomeNavigationProp = MaterialBottomTabNavigationProp<RootStackParamList, 'Home'>;

export type CategoryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categories'>;

export type AccountNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;
