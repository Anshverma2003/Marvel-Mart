import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Home from "./components/Home/home";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import CardDetails from "./components/CardDetails/cardDetails";
import Cart from "./components/Cart/cart"
import CartProvider from "./Context/context";
import Buy from "./components/Buy/buy";
import Signin from "./components/Signin/signIn";


function App() {
  return (
    <CartProvider>
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

            <Route exact path='/Cart'>
              <Cart />
            </Route>

            <Route exact path='/Buy'>
              <Buy />
            </Route>
            <Route>
              <Signin/>
            </Route>

            <Route component={PageNotFound} />

          </Switch>

        </div>
      </Router>
    </CartProvider>

  );
}

export default App;
