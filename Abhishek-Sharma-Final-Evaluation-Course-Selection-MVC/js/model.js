const API_URL = 'http://localhost:3000/courseList';

export const getCourses = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; 
  }
};

export const currentSortIndex =0;
export const sortOptions=[
  {value:"name",label:"Sort based on name",
    value:"credit", label:"Sort based on credit",
    value:"course_type", label:"Sort based on type"
  }
]