import './App.css';
import Landing from './components/Landing';
import SwipeViewContainer from './components/SwipeViewContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePlan from './components/CreatePlan';
import Header from './components/Header';
import PlanContainer from './components/Plan/PlanContainer';
import JoinContainer from './components/Join/JoinContainer';

function App() {
  return (
    <Router>
    <div className="App">
    <Header />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/create" element={<CreatePlan />} />
        <Route exact path="/swipeview" element={<SwipeViewContainer />} />
        <Route path="/:url/join" element={<JoinContainer />} />
        <Route path="/:url" element={<PlanContainer />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
