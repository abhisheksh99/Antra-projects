# Course Selection Page

This is a simple web application that allows users to select courses for a semester. It fetches course data from a local API (powered by json-server), displays available courses, and enables users to select courses while tracking total credits. The application is built using HTML, CSS, and vanilla JavaScript, following the Model-View-Controller (MVC) architectural pattern.

## Features

- **View Available Courses**: Fetches and displays a list of available courses from a local API.
- **Select/Deselect Courses**: Click a course to select or deselect it.
- **Credit Tracking**: Calculates and displays the total credits of selected courses.
- **Credit Limit**: Enforces a maximum of 18 credits per semester.
- **Confirmation**: Prompts user confirmation before finalizing course selection.
- **Persistent State**: Locks the selection after submission.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox).
- Node.js and npm installed for running json-server.

### Installation & Setup

1. **Clone the Repository**:
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/Show3567/json-server.git
   cd json-server
   ```

2. **Install JSON Server**:
   Install json-server globally using npm to serve the local API:
   ```bash
   npm install -g json-server
   ```

3. **Start the JSON Server**:
   From the project's root directory, start the json-server to serve the db.json file on port 3000:
   ```bash
   json-server --watch db.json --port 3000
   ```
   The API endpoint for fetching courses will be available at http://localhost:3000/courseList.

4. **Open the Application**:
   Open the `index.html` file in a web browser (e.g., by double-clicking it or using a local server like Live Server in VS Code).

## Usage

- The page loads and displays a list of available courses fetched from the API.
- Click a course to select it. Selected courses are highlighted, and the total credits are updated.
- Click a selected course to deselect it.
- Once satisfied with your selection, click the "Select" button.
- A confirmation dialog will appear. Confirming moves the selected courses to the "Selected Courses" bucket and locks further changes.

## Project Structure

```
.
├── css/
│   └── styles.css
├── js/
│   ├── controller.js
│   ├── model.js
│   └── view.js
├── index.html
└── README.md
```

- `index.html`: The main HTML file for the application.
- `css/styles.css`: Styles for the application.
- `js/`: JavaScript files organized in the MVC pattern:
  - `model.js`: Manages data and API interactions.
  - `view.js`: Handles UI rendering and DOM manipulation.
  - `controller.js`: Connects the model and view, managing application logic.

## Code Flow (MVC Architecture)

The application follows the Model-View-Controller (MVC) pattern for clear separation of concerns:

### 1. Model (`model.js`)
- **Purpose**: Manages data interactions.
- **Key Function**:
  - `getCourses()`: Fetches course data from `http://localhost:3000/courseList` using the Fetch API and returns it as a JSON object.

### 2. View (`view.js`)
- **Purpose**: Handles the presentation layer and user interface.
- **Key Functions**:
  - `renderCourses()`: Displays the list of courses in the UI.
  - `updateCreditCounter()`: Updates the displayed total credits.
  - `selectCourse()`/`deselectCourse()`: Adds or removes the 'selected' class for visual feedback.
  - `moveCoursesToSelected()`: Moves selected courses to the "Selected Courses" bucket after submission.
  - Displays alerts and confirmation dialogs.

### 3. Controller (`controller.js`)
- **Purpose**: Connects the Model and View, handling core application logic.
- **Workflow**:
  1. **Initialization** (`init()`): Entry point of the application.
  2. **Load Courses**: Calls `model.getCourses()` to fetch course data.
  3. **Render UI**: Passes fetched data to `view.renderCourses()` to display courses.
- **Event Handling**:
  - `handleCourseSelect()`: Manages course selection, checks credit limits, and updates the view.
  - `handleCourseDeselect()`: Manages course deselection.
  - `handleSelectButton()`: Handles the "Select" button click, confirms with the user, and finalizes the selection.

This MVC structure ensures the code is modular, maintainable, and scalable.

## Additional Notes

- For more information on json-server, visit its [GitHub repository](https://github.com/typicode/json-server).
- Ensure the JSON Server is running on port 3000 while using the application, as the course data is fetched from `http://localhost:3000/courseList`.

