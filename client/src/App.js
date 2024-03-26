import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar/navbar';
import Home from "./components/Home/home";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import CardDetails from "./components/CardDetails/cardDetails";
import Cart from "./components/Cart/cart"
import CartProvider from "./Context/context";
import Buy from "./components/Buy/buy";
import Signin from "./components/Signin/signIn";
import Login from "./components/Login/login";


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">

          <Switch>

            <Route exact path="/">
              <Navbar />
              <Home />
            </Route>

            <Route exact path="/productID/:id">
              <Navbar />
              <CardDetails />
            </Route>

            <Route exact path='/Cart'>
              <Navbar />
              <Cart />
            </Route>

            <Route exact path='/Buy'>
              <Navbar />

              <Buy />
            </Route>

            <Route exact path="/signup">
              <Navbar />
              <Signin />
            </Route>

            <Route exact path="/login">
              <Navbar />
              <Login />
            </Route>

            <Route>
              <Navbar />
              <PageNotFound />
            </Route>

          </Switch>

        </div>
      </Router>
    </CartProvider>

  );
}

export default App;
