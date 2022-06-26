import './App.css';
import Landing from './components/Landing';
import SwipeViewContainer from './components/SwipeViewContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePlan from './components/CreatePlan';
import Header from './components/Header';

function App() {
  return (
    <Router>
    <div className="App">
    <Header />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/createplan" element={<CreatePlan />} />
        <Route exact path="/swipeview" element={<SwipeViewContainer />} />
        <Route path="/plan/:url" element={<Landing />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
