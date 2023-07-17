# Taskify - Task Management App

Taskify is a task management mobile application built with React Native. It allows users to create, organize, and track their tasks easily and efficiently. This README provides an overview of the app's features, installation instructions, and usage guidelines.

## Screenshot

![Taskify Home Screenshot](https://github.com/hutamatr/taskify/blob/develop/assets/screenshot/home-screen.jpg)

![Taskify SignIn Screenshot](https://github.com/hutamatr/taskify/blob/develop/assets/screenshot/signin-screen.jpg)

![Taskify Profile Screenshot](https://github.com/hutamatr/taskify/blob/develop/assets/screenshot/profile-screen.jpg)

## Features

- Create tasks with titles, descriptions, due dates, and category
- Create category with name
- Mark tasks as completed or in progress
- Edit tasks detail
- Delete tasks & category
- View tasks based on category
- View tasks completed & in progress
- View recent tasks & categories
- User authentication
- Update username & user email

## Built With

Taskify is built using the following technologies:

- [React Native](https://reactnative.dev/)
- [Expo](https://docs.expo.dev/)
- [React Native Firebase](https://rnfirebase.io/)
- [React Native Paper](https://reactnativepaper.com/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- Material You theming

## Installation

To install and run Taskify locally, follow these steps:

1. Clone the repository:

   ```
   git clone git@github.com:hutamatr/taskify.git
   ```

2. Navigate to the project directory:

   ```
   cd taskify
   ```

3. Install the dependencies:

   ```
   yarn install
   ```

4. Set up the development environment:

   - For iOS: Run `pod install` in the `ios` directory.
   - For Android: No additional steps required.

5. Run the app:

   - For iOS: yarn ios
   - For Android: yarn android

   Make sure you have a simulator/emulator running or a physical device connected.

## Usage

Taskify provides a user-friendly interface to manage tasks effectively. Here's a brief guide on how to use the app:

1. Register an account or log in with your existing credentials.
2. Upon logging in, you will be directed to the dashboard home view.
3. Tap the "+" button to create a new task.
4. Fill in the task details, such as title, description, due date, and category.
5. Save the task, and it will appear in the task list.
6. To mark a task as completed, tap 3dots options in every task card, tap mark as completed.
7. To create category, press categories menu.
8. In categories menu, tap the "+" button to create a new category.
9. Fill category name.
10. Tap 'add category' button, and it will appear in the categories list.

## License

Taskify is released under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions regarding Taskify, feel free to reach out:

- Email: [hutamatr@gmail.com](mailto:hutamatr@gmail.com)
- GitHub: [hutamatr](https://github.com/hutamatr)
