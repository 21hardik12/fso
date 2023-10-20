import { useState } from 'react'


const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons}) => {
  return (
    <>
    {persons.map(person => (<Person key={person.name} person={person}/>))}
    </>
  )
}

const Filter = ({searchFilter, handleSearch}) => {
  return (
    <div>
      filter show with: <input type="text" value={searchFilter} onChange={handleSearch}/>
    </div>
  )
}

const PersonForm = ({name, number, handleName, handleNumber, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value = {name} onChange={handleName}/>
        </div>
        <div>
          phone Number: <input value = {number} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [newSearchFilter, setNewSearchFilter] = useState('');  
  const handleName = (e) => {
    const nName = e.target.value;        
    setNewName(nName);      
  }

  const handleNumber = (e) => {
    const nNumber = e.target.value;
    setNewNumber(nNumber);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === '') return
    const flag = persons.map(person => person.name).includes(newName);
    if (flag) {
      alert(`${newName} already exists in the phonebook`)
      setNewName('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const handleSearch = (e) => {
    const filter = e.target.value.toLowerCase();
    setNewSearchFilter(filter);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={newSearchFilter} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handleNumber={handleNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(newSearchFilter))} />
    </div>
  )
}

export default App