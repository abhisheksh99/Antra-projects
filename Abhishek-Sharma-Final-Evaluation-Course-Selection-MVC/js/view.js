import { sortOptions } from "./model";

export const renderCourses = (courses, onCourseSelect, onCourseDeselect) => {
  const availableContainer = document.getElementById('available-courses');
  const selectedContainer = document.getElementById('selected-courses');

  availableContainer.innerHTML = '';
  selectedContainer.innerHTML = '';

  courses.forEach(course => {
    const courseElement = createCourseElement(course, onCourseSelect, onCourseDeselect);
    availableContainer.appendChild(courseElement);
  });
};


const createCourseElement = (course, onCourseSelect, onCourseDeselect) => {
  const courseDiv = document.createElement('div');
  courseDiv.className = 'course-item';
  courseDiv.dataset.courseId = course.courseId;

  const courseType = course.required ? 'Compulsory Course' : 'Elective Course';

  courseDiv.innerHTML = `
    <div class="course-name">${course.courseName}</div>
    <div class="course-type">Course Type : ${courseType}</div>
    <div class="course-credit">Course Credit : ${course.credit}</div>
  `;

  courseDiv.addEventListener('click', () => {
    console.log('Course clicked:', course.courseName);
    if (onCourseSelect && onCourseDeselect) {
      const isSelected = courseDiv.classList.contains('selected');
      if (isSelected) {
        onCourseDeselect(course);
      } else {
        onCourseSelect(course);
      }
    }
  });

  return courseDiv;
};

export const renderSort = (sortOptions) ->{
  const checkbox = document.getElementById("sort-toggle")
  const button = document.getElementById("sort-button")

  

}

export const updateCreditCounter = (totalCredits) => {
  const creditElement = document.getElementById('total-credits');
  creditElement.textContent = totalCredits;
};



export const updateCourseSelection = (selectedCourses) => {
  document.querySelectorAll('.course-item').forEach(item => {
    const courseId = parseInt(item.dataset.courseId);
    if (selectedCourses.has(courseId)) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
};

export const moveCoursesToSelected = (selectedCoursesList, availableCoursesList) => {
  const availableContainer = document.getElementById('available-courses');
  const selectedContainer = document.getElementById('selected-courses');

  availableContainer.innerHTML = '';
  selectedContainer.innerHTML = '';

  selectedCoursesList.forEach(course => {
    const courseElement = createCourseElement(course, null, null); 
    selectedContainer.appendChild(courseElement);
  });

  availableCoursesList.forEach(course => {
    const courseElement = createCourseElement(course, null, null); 
    availableContainer.appendChild(courseElement);
  });
};

export const updateSelectButton = (coursesSubmitted) => {
  const selectBtn = document.getElementById('select-btn');
  if (coursesSubmitted) {
    selectBtn.disabled = true;
    selectBtn.textContent = 'Courses Selected';
  } else {
    selectBtn.disabled = false;
    selectBtn.textContent = 'Select';
  }
};





export const showCreditLimitAlert = () => {
  alert('You can only choose up to 18 credits in one semester');
};

export const showConfirmationDialog = (totalCredits) => {
  const message = `You have chosen ${totalCredits} credits for this semester. You cannot change once you submit. Do you want to confirm?`;
  return confirm(message);
};

export const showError = (message) => {
  alert(message);
};