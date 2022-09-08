import React, {Component} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Router
} from "react-router-dom";
import Admin from './components/admin.component';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login.component';
import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import { Col, Menu, Row } from 'antd';
const liStyle = {padding:'10px'}
class App extends Component{
  render() {
    // return (
    //   <div>
    //     <nav className="navbar navbar-expand navbar-dark bg-dark">
    //       <Link to={"/"} className="navbar-brand">
    //         АПК КНО
    //       </Link>
    //       <div className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <Link to={"/login"} className="nav-link">
    //             Пользоваатели
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to={"/admin"} className="nav-link">
    //             Add
    //           </Link>
    //         </li>
    //       </div>
    //     </nav>
    //     <div className="container mt-3" style={liStyle}>
    //       <Routes>
    //           <Route path='/login' element={<Login />}></Route>
    //           <Route path='/admin' element={<Admin />}></Route>
    //       </Routes>   
    //     </div>
    //   </div>
    // );
    const menu = [
      {
        label: "Пользователи", 
        key:"users",
        onClick:()=>{ window.location.href = "/admin"; Router.} 
      }
    ];

    return(
      <Layout className='layout'>
        <Header>
          <div className='logo'/>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} items={menu}>
          
          </Menu>
        </Header>
        <Content>
        <Row>
          <Col span={24}>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/admin' element={<Admin />}></Route>
            </Routes>
          </Col>
        </Row>
        </Content>
        <Footer style={{textAlign:'center'}}>Ant Design ©2018 Created by Ant </Footer>
      </Layout>
    );
  }
}


export default App;
