import { useEffect, useState } from "react";
import "./App.css";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personService from "./services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const filteredPersons =
    filter !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    let currentPerson = persons.find((person) => person.name === newName);
    if (currentPerson !== undefined) {
      let newPerson = {
        ...currentPerson,
        number: newNumber,
      };

      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(currentPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== currentPerson.id ? person : returnedPerson
              )
            );
          });
      }
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons([...persons, returnedPerson]);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDeletion = (id) => {
    let currentPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${currentPerson.name}?`)) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter}></Filter>
      <br />

      <h2>Add a new phone</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      ></PersonForm>
      <br />

      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        handleDeletion={handleDeletion}
      ></Persons>
    </div>
  );
}

export default App;
