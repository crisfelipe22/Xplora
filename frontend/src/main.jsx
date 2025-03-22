import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import '@fontsource/roboto/latin.css';
import { ProductProvider } from './contexts/ProductContext.jsx';
import { CategoryProvider } from './contexts/CategoryContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <CategoryProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CategoryProvider>
    </ProductProvider>
  </StrictMode>
)
