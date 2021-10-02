import Loader from "react-loader-spinner";
import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch, Link } from "react-router-dom";
import { useCartStore } from "./store/hook";

const withLazy = (comp) => (props) => {
  const Component = lazy(comp);
  return (
    <Suspense
      fallback={
        <div
          className="h-screen w-screen flex items-center justify-center"
          children={
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          }
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const CartData = () => {
  const { itemLength } = useCartStore();
  return (
    <div className="p-1 rounded transition duration-200 text-gray-100 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 ">
      <Link to={`/cart`}>cart : {itemLength}</Link>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className=" z-0 lg:flex-grow">
        <div className=" z-0 lg:flex-grow">
          <div className="bg-gray-800  flex justify-between">
            <div className="p-1 rounded transition duration-200 text-gray-100 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 ">
              <Link to={`/home`}> HOME </Link>
            </div>
            <CartData />
            <div className="p-1 rounded transition duration-200 text-gray-100 focus:outline-none focus:bg-gray-700 hover:bg-gray-700 ">
              <Link to={`/my-profile`}> Profile </Link>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route
          exact
          path="/home"
          component={withLazy(() => import("./pages/home"))}
        />
        <Route
          exact
          path="/cart"
          component={withLazy(() => import("./pages/cart"))}
        />
        <Route
          exact
          path="/product-details/:id"
          component={withLazy(() => import("./pages/product-details"))}
        />
        <Route
          exact
          path="/"
          render={(props) => <Redirect {...props} to="/home" />}
        />
        <Route
          path="/my-profile"
          component={withLazy(() => import("./pages/my-profile"))}
        />
        <Route
          path="/category/:category"
          component={withLazy(() => import("./pages/category"))}
        />
        <Route component={withLazy(() => import("./pages/error404"))} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
