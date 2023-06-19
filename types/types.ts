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
  HomeTabs: undefined;
  CreateTask: undefined;
  CreateCategories: undefined;
};

export type HomeNavigationProp = MaterialBottomTabNavigationProp<RootStackParamList, 'Home'>;

export type TasksNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;

export type CategoriesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categories'>;

export type AccountNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;
