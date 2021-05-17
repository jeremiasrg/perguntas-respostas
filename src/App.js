import "./App.css";
import Home from "./pages/Home";
import ExamBuilder from "./pages/ExamBuilder";
import RunExam from "./pages/RunExam";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/examBuilder" component={ExamBuilder}></Route>
        <Route exact path="/runExam" component={RunExam}></Route>
      </Switch>
    </Router>
  );
}

export default App;
