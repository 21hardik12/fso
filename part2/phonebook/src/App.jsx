import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleName = (e) => {
    const nName = e.target.value;
    setNewName(nName);  
  }

  const handleSubmit = (e) => {
    e.preventdefault();
    setPersons(persons.concat({name: newName}));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value = {newName} onChange={handleName}/>
        </div>
        <div>
          <button onSubmit={handleSubmit} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (<p key={person.name}>{person.name}</p>))}
    </div>
  )
}

export default App