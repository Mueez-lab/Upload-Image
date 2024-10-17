import Header from './Components/Header'
import Register from './Components/Register'
import Home from './Components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
          <Header />
        <Routes>
          <Route path="/register" element={<Register />}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
