import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "@fontsource/open-sans";
// import "@fontsource/poppins"; // Defaults to weight 400
// import "@fontsource/poppins/900.css"; // Specify weight
// import "@fontsource/poppins/400.css"; // Specify weight and style
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
