# Project Overview

This project is structured to facilitate the development of a Fitness Tracker React Native application with a clear separation of concerns. Below is a detailed explanation of the project structure:

## Project Structure

### Root Directory

-   **.env**: Environment variables configuration file.
-   **.expo/**: Contains Expo-specific configuration files.
    -   **devices.json**: Configuration for connected devices.
-   **README.md**: Project documentation.
-   **.gitignore**: Specifies files and directories to be ignored by Git.
-   **.vscode/**: Visual Studio Code workspace settings.
    -   **.react/**: React-specific settings for VS Code.

### Directory

-   **apis/**: Contains API-related files.
    -   **SupabaseModel.js**: API model for interacting with Supabase.
-   **assets/**: Directory for static assets like images, fonts, etc.
-   **components/**: Reusable UI components.
    -   **AnimatedBGComp.js**: Component for animated background.
    -   **BottomNavBarComp.js**: Bottom navigation bar component.
    -   **ConfirmationModalComp.js**: Modal component for confirmations.
    -   **CountdownModal.js**: Countdown modal component.
    -   **FAQComp.js**: Frequently Asked Questions component.
    -   **HeaderComp.js**: Header component.
    -   **InputModalComp.js**: Modal component for input.
    -   **LoaderComp.js**: Loader/spinner component.
    -   **NavigateIconComp.js**: Navigation icon component.
    -   **QuestionComp.js**: Question display component.
    -   **TimerComp.js**: Timer component.
-   **controllers/**: Contains controller files for managing screen logic.
    -   **ChangePinScreenController.js**: Controller for the Change PIN screen.
-   **models/**: Directory for data models.
-   **routes/**: Contains navigation stack configurations.
    -   **AppStack.js**: Main application stack navigator.
-   **screens/**: Directory for screen components.
-   **store/**: State management files.
-   **utils/**: Utility functions and helpers.

### Configuration Files

-   **App.js**: Entry point of the React Native application.
-   **app.json**: Expo configuration file.
-   **babel.config.js**: Babel configuration file.
-   **package.json**: Project dependencies and scripts.

## Getting Started

To get started with this project, follow these steps:

1. **Install Dependencies**:

    ```sh
    npm install
    ```

2. **Run the Project**:

    ```sh
    npm start
    ```

3. **Build the Project**:
    ```sh
    npm run build
    ```

## Contributing

Please read the CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
