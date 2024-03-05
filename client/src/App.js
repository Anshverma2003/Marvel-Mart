import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Home from "./components/Home/home";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import CardDetails from "./components/CardDetails/cardDetails";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/Clothes/:id">
            <CardDetails />
          </Route>

          <Route component={PageNotFound} />

        </Switch>

      </div>
    </Router>

  );
}

export default App;
