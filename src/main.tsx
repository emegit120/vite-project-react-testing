import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './routes';
// @material-tailwind/react
import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>,
)
