import * as model from './model.js';
import * as view from './view.js';

let courses = [];
const MAX_CREDITS = 18;

const loadCourses = async () => {
  try {
    courses = await model.getCourses();
    view.renderCourses(courses, handleCourseSelect, handleCourseDeselect);
    view.updateCreditCounter(0);
    view.updateSelectButton();
  } catch (error) {
    console.error('Error loading courses:', error);
    
    alert('Error loading courses. Please check if the JSON server is running.');
  }
};

const handleCourseSelect = (course) => {
  console.log('Course selected:', course);
  if (view.coursesSubmitted) {
    return; 
  }
  
  const currentCredits = view.getTotalSelectedCredits(courses);
  const newTotalCredits = currentCredits + course.credit;
  
  if (newTotalCredits > MAX_CREDITS) {
    view.showCreditLimitAlert();
    return;
  }
  
  view.selectCourse(course.courseId);
  view.updateCreditCounter(newTotalCredits);
  view.renderCourses(courses, handleCourseSelect, handleCourseDeselect);
};

const handleCourseDeselect = (course) => {
  if (view.coursesSubmitted) {
    return; 
  }
  
  view.deselectCourse(course.courseId);
  const newTotalCredits = view.getTotalSelectedCredits(courses);
  view.updateCreditCounter(newTotalCredits);
  view.renderCourses(courses, handleCourseSelect, handleCourseDeselect);
};

const handleSelectButton = () => {
  if (view.coursesSubmitted) {
    return;
  }
  
  const totalCredits = view.getTotalSelectedCredits(courses);
  
  if (totalCredits === 0) {
    alert('Please select at least one course before submitting.');
    return;
  }
  
  const confirmed = view.showConfirmationDialog(totalCredits);
  
  if (confirmed) {
    view.moveCoursesToSelected(courses);
    view.updateCreditCounter(totalCredits);
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