import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface ITask {
  id?: string;
  author: string;
  description: string;
  isCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type RootStackParamList = {
  Category: undefined;
  Account: undefined;
  Tasks: undefined;
};

export type RootStackParamListTabs = {
  Home: undefined;
  CategoryStack: undefined;
  AccountStack: undefined;
  AllTasksStack: undefined;
};

export type HomeNavigationProp = NativeStackNavigationProp<RootStackParamListTabs, 'Home'>;

export type CategoryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

export type AccountNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;
