import React, {Component} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Admin from './components/admin.component';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login.component';
const liStyle = {padding:'10px'}
class App extends Component{
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            АПК КНО
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Пользоваатели
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3" style={liStyle}>
          <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/admin' element={<Admin />}></Route>
          </Routes>   
        </div>
      </div>
    );
  }
}


export default App;
