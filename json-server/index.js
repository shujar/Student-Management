const student = require('./students.json');
const course = require('./courses.json');
const studentCourses = require('./student_courses.json');

module.exports = () => ({
  students: student,
  courses: course,
  studentCourses: studentCourses
});