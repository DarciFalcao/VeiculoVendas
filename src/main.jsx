import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './components/App.jsx'
import Veiculo from './components/Veiculo.jsx'
import NavBar from './components/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { Route, Routes, BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='main-div'>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path='/veiculos' element={<Veiculo/>} />
          <Route path='/' element={<h1>Ola</h1>} />
        </Routes>
      </BrowserRouter>

    </div>

  </React.StrictMode>,
)
