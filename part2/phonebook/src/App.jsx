import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleDelete}) => {
  return (
    <>
    <p>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></p>       
    </>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <>
    {persons.map(person => (<Person handleDelete={handleDelete} key={person.name} person={person}/>))}
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
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])


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
    const foundPersonIdx = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())
    if (foundPersonIdx > -1) {
      if(window.confirm(`${newName} already exists in the phonebook. want to replace old number ?`)) {
        personService.update({...persons[foundPersonIdx], number: newNumber})
                     .then(response => setPersons(persons.toSpliced(foundPersonIdx, 1, response)))
        setNewName('')
        setNewNumber('')
        return                
      }
      setNewName('')
      setNewNumber('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    
    personService.create(newPerson).then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleSearch = (e) => {
    const filter = e.target.value.toLowerCase();
    setNewSearchFilter(filter);
  }

  const handleDelete = (person) => {    
    if (window.confirm(`Delete ${person.name}`)) 
      personService.deletePerson(person.id).then(response => {
        setPersons(persons.filter(_person => _person.id !== person.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchFilter={newSearchFilter} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm name={newName} number={newNumber} handleName={handleName} handleNumber={handleNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons handleDelete={handleDelete} persons={persons.filter(person => person.name.toLowerCase().includes(newSearchFilter))} />
    </div>
  )
}

export default App