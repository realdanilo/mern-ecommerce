import React from "react";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
// materials
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
 
function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/" render={() => <HomeScreen />} />
            <Route
              exact
              path="/product/:id"
              render={(rp) => <ProductScreen {...rp} />}
            />
            <Route
              exact
              path="/cart/:id?"
              render={(rp) => <CartScreen {...rp} />}
            />
            <Route
              exact
              path="/login"
              render={(rp) => <LoginScreen {...rp} />}
            />
            <Route path="/" render={() => <h1>Wrong Route</h1>} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
