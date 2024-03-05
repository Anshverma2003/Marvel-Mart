import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from './components/Navbar/navbar';
import Home from "./components/Home/home";
import PageNotFound from "./components/pageNotFound/pageNotFound";

function App() {
  return (
    <Router>

      <div className="App">
      <Navbar />

        <Switch>

          <Route exact path="/">

            <Home/>
            
          </Route>

          <Route component ={PageNotFound}/>

        </Switch>

      </div>
    </Router>

  );
}

export default App;
