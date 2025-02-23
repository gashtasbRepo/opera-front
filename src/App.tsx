import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router } from 'react-router-dom'; 
import './App.css';
import './assets/fonts/fonts.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Router> 
      <AnimatePresence mode="wait">
        <Layout />
      </AnimatePresence>
    </Router>
  );
}

export default App;
