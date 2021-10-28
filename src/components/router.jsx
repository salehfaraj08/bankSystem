import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./Users";
import Register from "./register";
import Deposit from "./deposit";
import Transfer from "./transfer";
import Main from "./Main";
const RouterNav = () => {
  return (<>
    <Router>
      <div>
        <nav>
          <ul className='nav-bar'>
            <li>
              <Link className='a' to="/">Home</Link>
            </li>
            <li>
              <Link className='a' to="/register">Register</Link>
            </li>
            <li>
              <Link className='a' to="/users">Users</Link>
            </li>
            <li>
              <Link className='a' to="/deposit">Deposit money</Link>
            </li>
            <li>
              <Link className='a' to="/transfer">Transfer money</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/transfer">
            <Transfer />
          </Route>
          <Route path="/deposit">
            <Deposit />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  </>);
};

export default RouterNav;
