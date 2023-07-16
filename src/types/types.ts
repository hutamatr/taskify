import type { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface IAuth {
  username?: string;
  email: string;
  password: string;
}

export interface ICredentials extends IAuth {
  confirmPassword: string;
}

export interface IUser {
  id?: string;
  userId: string;
  email: string;
  username: string;
  password?: string;
}

export interface ITask {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string | null;
  categoryId?: string;
  categoryName?: string;
  userId?: string;
}

export interface ICategories {
  id?: string;
  name: string;
  createdAt?: string;
  userId?: string;
}

export interface IProfile {
  displayName?: string | null;
  photoURL?: string | null;
}

interface ISnackbar {
  snackbarShow: boolean;
  message?: string;
}

export interface RootStackParamList extends ParamListBase {
  Home: undefined;
  Categories: ISnackbar;
  Profile: ISnackbar;
  Tasks: ISnackbar;
  HomeTabs: undefined;
  CreateTask: undefined;
  EditTask: ITask;
  EditProfile: { profileWantUpdate: string };
  CreateCategories: undefined;
  CategoriesDetail: ICategories;
  SignUp: undefined;
  SignIn: undefined;
}

export type HomeNavigationProp = MaterialBottomTabNavigationProp<RootStackParamList, 'Home'>;
export type TasksNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tasks'>;
export type CategoriesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Categories'>;
export type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;
export type CreateTaskNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
export type EditTaskNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditTask'>;
export type EditProfileNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;
export type CreateCategoriesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateCategories'
>;
export type CategoriesDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CategoriesDetail'
>;
export type SignInScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sign In'>;
export type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sign Up'>;

export type CategoriesDetailScreenRouteProp = RouteProp<RootStackParamList, 'CategoriesDetail'>;
export type CategoriesScreenRouteProp = RouteProp<RootStackParamList, 'Categories'>;
export type EditTaskScreenRouteProp = RouteProp<RootStackParamList, 'EditTask'>;
export type EditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>;
export type TasksScreenRouteProp = RouteProp<RootStackParamList, 'Tasks'>;
export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
