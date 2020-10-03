import React from "react";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
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
            <Route exact path="/" render={(rp) => <HomeScreen />} />
            <Route
              exact
              path="/:id"
              render={(rp) => <ProductScreen {...rp} />}
            />
            <Route path="/" render={(rp) => <h1>Wrong Route</h1>} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
