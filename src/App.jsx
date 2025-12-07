import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import YesPage from './pages/YesPage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/yes" element={<YesPage />} />
      <Route path="/no" element={<NoPage />} />
    </Routes>
  );
}

export default App;
