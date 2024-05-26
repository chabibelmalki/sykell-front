
import NotFound from './pages/NotFound/NotFound';
import Home from './pages/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createRoute(path, element) {
  return {
    path,
    element,
    errorElement: <NotFound />
  };
}

// Utilisation de la fonction helper pour définir les routes
const router = createBrowserRouter([
  createRoute("/", <Home />),
]);

const theme = createTheme({
  palette: {
    background: {
      default: '#FAFAFB',
    },
  },
});

function App() {
  return (
    <div className="App">

      <CssBaseline />
      <ThemeProvider theme={theme} >
        <RouterProvider router={router} />
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
