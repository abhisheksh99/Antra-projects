export const renderCourses = (courses, onCourseSelect, onCourseDeselect) => {
  const availableContainer = document.getElementById('available-courses');
  const selectedContainer = document.getElementById('selected-courses');
  

  availableContainer.innerHTML = '';
  selectedContainer.innerHTML = '';
  
  courses.forEach(course => {
    const courseElement = createCourseElement(course, onCourseSelect, onCourseDeselect);
    
    // Always add to available container - selection is visual only
    availableContainer.appendChild(courseElement);
  });
  
  // Update visual selection state after rendering
  updateCourseSelection();
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
    console.log('Course clicked:', course.courseName, 'Selected:', selectedCourses.has(course.courseId));
    if (selectedCourses.has(course.courseId)) {
      onCourseDeselect(course);
    } else {
      onCourseSelect(course);
    }
  });
  
  return courseDiv;
};

export const updateCreditCounter = (totalCredits) => {
  const creditElement = document.getElementById('total-credits');
  creditElement.textContent = totalCredits;
};

export const selectCourse = (courseId) => {
  selectedCourses.add(courseId);
  updateCourseSelection();
};

export const deselectCourse = (courseId) => {
  selectedCourses.delete(courseId);
  updateCourseSelection();
};

const updateCourseSelection = () => {

  document.querySelectorAll('.course-item').forEach(item => {
    const courseId = parseInt(item.dataset.courseId);
    if (selectedCourses.has(courseId)) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
};

export const moveCoursesToSelected = (courses) => {
  const availableContainer = document.getElementById('available-courses');
  const selectedContainer = document.getElementById('selected-courses');
  

  availableContainer.innerHTML = '';
  selectedContainer.innerHTML = '';
  

  courses.forEach(course => {
    if (selectedCourses.has(course.courseId)) {
      const courseElement = createCourseElement(course, () => {}, () => {});
     
      selectedContainer.appendChild(courseElement);
    } else {
      const courseElement = createCourseElement(course, () => {}, () => {});
      availableContainer.appendChild(courseElement);
    }
  });
  
  coursesSubmitted = true;
  updateSelectButton();
};

export const updateSelectButton = () => {
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

export const getSelectedCourses = () => {
  return Array.from(selectedCourses);
};

export const isCourseSelected = (courseId) => {
  return selectedCourses.has(courseId);
};

export const getTotalSelectedCredits = (courses) => {
  return courses
    .filter(course => selectedCourses.has(course.courseId))
    .reduce((total, course) => total + course.credit, 0);
};


export let selectedCourses = new Set();
export let coursesSubmitted = false;