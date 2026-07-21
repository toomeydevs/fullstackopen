const PersonForm = ({
  addName,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      </div>

      <div>
        number:{' '}
        <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
        />
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm