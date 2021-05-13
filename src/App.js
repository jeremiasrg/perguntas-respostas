import "./App.css";
import Home from "./pages/Home";
import ExamBuilder from "./pages/ExamBuilder";
import ConfigExam from "./pages/ConfigExam";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/examBuilder" component={ExamBuilder}></Route>
        <Route exact path="/configExam" component={ConfigExam}></Route>
      </Switch>
    </Router>
  );
}

export default App;
