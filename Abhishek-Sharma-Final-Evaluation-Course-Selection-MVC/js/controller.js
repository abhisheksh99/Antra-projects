import * as model from './model.js';
import * as view from './view.js';

let courses = [];
let selectedCourses = new Set();
let coursesSubmitted = false; 
const MAX_CREDITS = 18;

const loadCourses = async () => {
  try {
    courses = await model.getCourses();
    view.renderCourses(courses, handleCourseSelect, handleCourseDeselect);
    view.renderSort(model.sortOptions);
    view.updateCreditCounter(0);
    view.updateSelectButton(coursesSubmitted);
  } catch (error) {
    console.error('Error loading courses:', error);
    view.showError('Error loading courses. Please check if the JSON server is running.');
  }
};




const sortCourses = (sortOptions) => {
  if(!document.getElementById("sort-toggle").checked) return;
  courses.sort((a,b) =>{
    if(sortOption=="name"){
      return a.courseName.localeCompare(b.courseName)
    }
    else if(sortOptions="credit"){
      return course.sort((a,b) -> a.credit -b.credit)
    }else if(sortOptions="course_type"){
      return a.required === true ? a: b;
    }
  })
}

const handleCourseSelect = (course) => {
  console.log('Course selected:', course);
  if (coursesSubmitted) return;

  const currentCredits = getTotalSelectedCredits();
  const newTotalCredits = currentCredits + course.credit;

  if (newTotalCredits > MAX_CREDITS) {
    view.showCreditLimitAlert();
    return;
  }

  selectedCourses.add(course.courseId);
  view.updateCourseSelection(selectedCourses);
  view.updateCreditCounter(newTotalCredits);
};

const handleCourseDeselect = (course) => {
  if (coursesSubmitted) return;

  selectedCourses.delete(course.courseId);
  view.updateCourseSelection(selectedCourses);
  const newTotalCredits = getTotalSelectedCredits();
  view.updateCreditCounter(newTotalCredits);
};

const getTotalSelectedCredits = () => {
  return courses
    .filter(course => selectedCourses.has(course.courseId))
    .reduce((total, course) => total + course.credit, 0);
};

const handleSelectButton = () => {
  if (coursesSubmitted) return;

  const totalCredits = getTotalSelectedCredits();

  if (totalCredits === 0) {
    view.showError('Please select at least one course before submitting.');
    return;
  }

  const confirmed = view.showConfirmationDialog(totalCredits);

  if (confirmed) {
    coursesSubmitted = true;
    const selectedCoursesList = courses.filter(course => selectedCourses.has(course.courseId));
    const availableCoursesList = courses.filter(course => !selectedCourses.has(course.courseId));
    view.moveCoursesToSelected(selectedCoursesList, availableCoursesList);
    view.updateCreditCounter(totalCredits);
    view.updateSelectButton(coursesSubmitted);
  }
};

const bindSelectButton = () => {
  const selectBtn = document.getElementById('select-btn');
  selectBtn.addEventListener('click', handleSelectButton);
};

// Initialize the application
const init = () => {
  bindSelectButton();
  loadCourses();
};

// Entry Point
init();