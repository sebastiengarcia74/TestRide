import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResourceList from './components/ResourceList';
import ResourceDetail from './components/ResourceDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/resource/:id" element={<ResourceDetail />} />
        <Route path="/" element={<ResourceList />} />
      </Routes>
    </Router>
  );
}

export default App;
