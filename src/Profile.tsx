
type Person = {
  name: string
  age: number
}

export default function Profile({ person }: { person: Person} ) {

  return (
    <>
      <p>my name is {person.name}!</p>
      <p>I'm {person.age} years old!</p>
    </>
  )
}
