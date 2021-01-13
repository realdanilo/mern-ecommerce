import React from "react";
//components
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen" 
import PaymentScreen from "./screens/PaymentScreen" 
import PlaceOrderScreen from "./screens/PlaceOrderScreen" 
import OrderScreen from "./screens/OrderScreen" 
import UserListScreen from "./screens/UserListSreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
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
            <Route
              exact
              path="/register"
              render={(rp) => <RegisterScreen {...rp} />}
            />
            <Route
              exact
              path="/profile"
              render={(rp) => <ProfileScreen {...rp} />}
            />
            <Route
              exact
              path="/shipping"
              render={(rp) => <ShippingScreen {...rp} />}
            />
            <Route
              exact
              path="/payment"
              render={(rp) => <PaymentScreen {...rp} />}
            />
            <Route
              exact
              path="/placeorder"
              render={(rp) => <PlaceOrderScreen {...rp} />}
            />
            <Route
              exact
              path="/admin/userlist"
              render={(rp) => <UserListScreen {...rp} />}
            />
            <Route
              exact
              path="/admin/user/:id/edit"
              render={(rp) => <UserEditScreen {...rp} />}
            />
            <Route
              exact
              path="/admin/productlist"
              render={(rp) => <ProductListScreen {...rp} />}
            />
            <Route
              exact
              path="/admin/product/:id/edit"
              render={(rp) => <ProductEditScreen {...rp} />}
            />
            <Route exact path="/order/:id" render={(rp)=> <OrderScreen {...rp} />} />
            <Route path="/" render={() => <h1>Wrong Route</h1>} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
