import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Route } from "react-router-dom";
import LoginPage from "./authModule/Login/LoginPage";
import { validateLogin } from "./authModule/store/actions";
import ProductsList from "./productsModule/ProductsList";
import ProductForm from "./components/ProductForm";
import LogoutBar from "./components/LogoutBar";

const AuthRoutes = ({ auth, history, location, dispatch, ...props }) => {
  //to avoid request for valid tooken start verifiedSession as !logged so if not logged is treated as verified
  const [verifiedSession, setVerifiedSession] = useState(!auth.logged);

  useEffect(() => {
    if (auth.logged && !verifiedSession) {
      dispatch(validateLogin(auth.token));
      setVerifiedSession(true);
    }
    if (!auth.logged && location.pathname !== "/loggin")
      history.replace("/loggin");
    else if (auth.logged) history.push("/list");
    //eslint-disable-next-line
  }, [auth.logged, verifiedSession]);
  return (
    <>
      <Route path="/loggin" exact>
        <LoginPage />
      </Route>
      <Route path="/list" exact>
        <LogoutBar />
        <ProductsList />
      </Route>
      <Route path="/product/:id?">
        <LogoutBar />
        <ProductForm />
      </Route>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(withRouter(AuthRoutes));
