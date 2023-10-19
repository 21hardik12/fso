const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part) => {
        return (
          <Part key={part.id} part={part.name} exercise={part.exercises} />
        );
      })}
    </>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((acc, curr) => (acc += curr.exercises), 0);
  return <h3>Total of {total} exercises</h3>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((_course) => (
        <Course key={_course.id} course={_course} />
      ))}
    </>
  );
};
