import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DisplayData from './DisplayData.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/DisplayData" element={<DisplayData />} />
      </Routes>
    </Router>
  </StrictMode>,
)

