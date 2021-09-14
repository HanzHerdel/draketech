import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Provider from "react-redux/es/components/Provider";
import Message from "./components/messages/Message";
import { store, persistor } from "./store";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import AuthRoutes from "./AuthRoutes.js";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Message />

        <Router>
          <AuthRoutes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
