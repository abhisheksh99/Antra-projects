# Class Selection Page

This is a simple web application that allows users to select courses for a semester. It fetches course data from a local API, displays available courses, and allows users to select them while keeping track of the total credits. The application is built using HTML, CSS, and vanilla JavaScript, following a Model-View-Controller (MVC) architectural pattern.

## Features

- **View Available Courses**: Fetches and displays a list of available courses from a local API.
- **Select/Deselect Courses**: Click on a course to select or deselect it.
- **Credit Tracking**: Calculates and displays the total credits of the selected courses.
- **Credit Limit**: Enforces a maximum of 18 credits per semester.
- **Confirmation**: Asks for user confirmation before finalizing the course selection.
- **Persistent State**: Once courses are submitted, the selection is locked.

## Getting Started

To run this project locally, you'll need to have `json-server` installed. For more information on `json-server`, you can visit its [GitHub repository](https://github.com/Show3567/json-server). If you don't have it, you can install it globally via npm:

```bash
npm install -g json-server
```

### Prerequisites

- A modern web browser.
- Node.js and npm (for running `json-server`).

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Start the JSON server:**

    Navigate to the project's root directory and run the following command to start the local API server. This will serve the `db.json` file on port 3000.

    ```bash
    json-server --watch db.json --port 3000
    ```

    The API endpoint for fetching the course list will be `http://localhost:3000/courseList`.

3.  **Open the application:**

    Open the `index.html` file in your web browser.

## Usage

1.  The page will load and display a list of available courses.
2.  Click on any course to select it. The selected course will be highlighted, and the total credits will be updated.
3.  Click on a selected course again to deselect it.
4.  Once you are satisfied with your selection, click the "Select" button.
5.  A confirmation dialog will appear. If you confirm, your selected courses will be moved to the "Selected Courses" bucket, and you will no longer be able to make changes.

## Project Structure

```
.
├── css/
│   └── styles.css
├── js/
│   ├── controller.js
│   ├── model.js
│   └── view.js
├── db.json
├── index.html
└── README.md
```

-   `index.html`: The main HTML file for the application.
-   `css/styles.css`: Contains the styling for the application.
-   `js/`: This directory holds the JavaScript files, structured according to the MVC pattern.
    -   `model.js`: Handles data and API interactions.
    -   `view.js`: Manages the UI and DOM manipulation.
    -   `controller.js`: Acts as the intermediary, connecting the model and the view.
-   `db.json`: The local database file used by `json-server` to provide the course data.

## Code Flow (MVC Architecture)

The application's logic is separated into three main components:

### 1. Model (`model.js`)

-   **Purpose**: To manage the application's data. In this project, its sole responsibility is to fetch the list of courses from the API.
-   **Key Function**: `getCourses()`: This function sends a `fetch` request to `http://localhost:3000/courseList` and returns the course data as a JSON object.

### 2. View (`view.js`)

-   **Purpose**: To handle the presentation layer. It is responsible for everything the user sees in the browser.
-   **Key Functions**:
    -   `renderCourses()`: Creates and displays the list of courses in the UI.
    -   `updateCreditCounter()`: Updates the total credits displayed on the page.
    -   `selectCourse()`/`deselectCourse()`: Adds or removes a 'selected' class to a course element for visual feedback.
    -   `moveCoursesToSelected()`: Moves the selected courses to the "Selected Courses" bucket after submission.
    -   It also handles showing alerts and confirmation dialogs.

### 3. Controller (`controller.js`)

-   **Purpose**: To connect the Model and the View. It contains the core application logic.
-   **Workflow**:
    1.  **Initialization (`init()`):** The `init` function is the entry point of the application.
    2.  **Load Courses:** It calls `model.getCourses()` to fetch the data.
    3.  **Render UI:** Once the data is retrieved, it calls `view.renderCourses()` to display the courses.
    4.  **Event Handling:** The controller sets up event listeners for user actions:
        -   `handleCourseSelect()`: Triggered when a user clicks to select a course. It checks the credit limit and updates the view.
        -   `handleCourseDeselect()`: Triggered when a user clicks to deselect a course.
        -   `handleSelectButton()`: Triggered when the "Select" button is clicked. It confirms the selection with the user and then finalizes the process.

This separation of concerns makes the code more organized, easier to maintain, and scalable.
