import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { makeServer } from './mirage'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pet from './pages/Pet'
import Task from './pages/Task'
import Layout from './pages/Layout'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


makeServer({environment: "dev"})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='pets/:petId' element={<Pet />}/>
            <Route path='pets/:petId/tasks/:taskId' element={<Task />}/>
            <Route path="*" element={<NoPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
