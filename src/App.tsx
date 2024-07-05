import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import User from './components/User';
import Pets from './components/Pets';
import { useAppSelector } from './state/hooks';
import Pet from './components/Pet';

function App() {
  let userId = 1; // TODO: User authentication - get userId from successful login attempt
  const pets = useAppSelector((state) => state.pets) // Pets of current user

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
        <User userId={userId}/>
        {pets.data && pets.data.data && pets.data.focusId ?
          <Pet pet={pets.data.data.find((pet) => pet.id === pets.data?.focusId)}/>
        :
          <Pets userId={userId}/>
        }
        
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
