import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// LAYOUTS
import RootLayout from './components/layouts/RootLayout.jsx'

// COMPONENTS
import HomePage from './components/home/index.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<HomePage/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
