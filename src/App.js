import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import History from './pages/History/History'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {


  return (
    <Router>
      <div className="App" >
        <Header />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/history' component={History} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
