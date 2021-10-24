import "./Home.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Input from "./Input";
import Home from "./Home";
import View from "./View";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/input" exact component={Input} />
        <Route path="/view" exact component={View} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
