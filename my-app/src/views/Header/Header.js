import React, {Component} from 'react';
import Login from './Login';
import {Switch, Route, NavLink, Router} from 'react-router-dom';
import { Input, Menu, Icon } from 'antd';
const { SubMenu } = Menu;



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  toggleLogin = () => {
    const {visible} = this.state;
    this.setState({
      visible: !visible,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Menu mode="horizontal" className="d-flex justify-content-between" theme="dark">
          <Menu.Item key="home" style={{width: '20%'}}>

            <a href="/home">Магазин книг</a>

          </Menu.Item>
          <Menu.Item key="search" style={{width: '30%'}}>

            <Input placeholder="Поиск"/>

          </Menu.Item>
          <Menu.Item key="login" style={{width: '20%'}}
                     className="d-flex align-items-center"
                     onClick={this.toggleLogin}
          >
            <Icon type="user" />

            <span>Войти</span>

          </Menu.Item>
        </Menu>
        <Login
          visible={visible}
          toggleLogin={this.toggleLogin}
        />

      </>
    )
  }

}

export default Header;

