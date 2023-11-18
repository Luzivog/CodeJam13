import logo from './logo.svg';
import './App.css';
import PieChart from './components/donut'
import SearchBar from './components/searchbar'
import Home from './pages/Home'
import SongPage from './pages/SongPage'
function App() {
  return (
    <div className="App">
      <Home />
      {/* <SongPage/> */}
    </div>
  );
}

export default App;
