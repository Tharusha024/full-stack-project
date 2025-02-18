import { Routes, Route } from 'react-router-dom';
import LoggingPage from './components/Pages/LoggingPage/LoggingPage';
import Home from './components/Home/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<LoggingPage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
      <Toaster position="top-right"/>
    </>
  );
}

export default App;
