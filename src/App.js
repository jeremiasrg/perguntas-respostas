import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import ExamBuilder from "./pages/ExamBuilder";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/examBuilder" component={ExamBuilder}></Route>
      </Switch>
    </Router>
  );
}

export default App;
