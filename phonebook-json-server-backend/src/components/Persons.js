const Person = ({ person, handleDeletion }) => {
  return (
    <li>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDeletion(person.id)}>delete</button>
    </li>
  );
};

const Persons = ({ filteredPersons, handleDeletion }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person
          key={person.name}
          person={person}
          handleDeletion={handleDeletion}
        />
      ))}
    </ul>
  );
};

export default Persons;
