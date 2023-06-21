import { type MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { type ParamListBase } from '@react-navigation/native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  date: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface ICategories {
  id?: string;
  name: string;
}

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Categories: undefined;
  Profile: undefined;
  Tasks: undefined;
  HomeTabs: undefined;
  CreateTask: undefined;
  CreateCategories: undefined;
}

export type HomeNavigationProp = MaterialBottomTabNavigationProp<RootStackParamList, 'Home'>;

export type TasksNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;

export type CategoriesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categories'>;

export type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export type CreateTaskNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
