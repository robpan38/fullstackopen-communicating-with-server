const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Content = ({ course }) => {
  const parts = course.parts;

  return (
    <>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part}></Part>
        ))}
      </ul>
    </>
  );
};

const Total = ({ course }) => {
  const parts = course.parts;
  const total = parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <>
      <p>Number of exercises: {total}</p>
    </>
  );
};

const App = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );
};

export default App;
