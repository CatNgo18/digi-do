import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Pet } from './fetchers';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { fetchUserById } from './state/user/userSlice';

function App() {
  const [count, setCount] = useState(0)
  const user = useAppSelector((state) => state.user.data) // Current user
  const dispatch = useAppDispatch();
  const [pets, setPets] = useState<Pet[]>([]) // Pets of current user

  useEffect(() => {
    dispatch(fetchUserById(import.meta.env.VITE_USER_ID))
  }, [])

  useEffect(() => {
    fetch(`/api/users/${import.meta.env.VITE_USER_ID}/pets`)
    .then(r => r.json())
    .then(r => {setPets(r.pets)})
  }, [user])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {user && <p>Welcome, {user.name}!</p>}
        {pets && pets.map((pet, index) => {
          if (!pet.garden)
            return (
              <div key={index}>
                <p>Name: {pet?.name}</p>
                <p>Title: {pet?.title}</p>
                <p>Description: {pet?.description}</p>
              </div>
            )
        })}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
