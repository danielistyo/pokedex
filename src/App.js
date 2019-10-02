import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Detail from "./pages/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/pokemon/:id" component={Detail} />
    </Router>
  );
}

export default App;
