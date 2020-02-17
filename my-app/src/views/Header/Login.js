import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Row, Col, Input, Button, Modal } from 'antd';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visibleError: false
    }
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    const {visibleError} = this.state;
    event.preventDefault();

    let response = await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
    let result = await response.json();
    if (response.status === 200) {
      localStorage.setItem('token', result.token);
    } else if (response.status === 403) {
      this.handleVisibleError();
    }
  };

  login = async event => {

    let response = await fetch(`http://localhost:3000/login/new`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
  };

  handleVisibleError = () => {
    const {visibleError} = this.state;
    this.setState({
      visibleError: !visibleError
    })
  };


  render() {
    const { visible, toggleLogin } = this.props;
    const {visibleError} = this.state;
     console.log(visibleError);
    return (
      <>
        <Modal
          title="Войти"
          visible={visible}
          onOk={toggleLogin}
          onCancel={toggleLogin}
          footer={[
            <Button variant="primary"
                    type="primary"
                    onClick={this.handleSubmit}
                    className="mb-3"
            >
              Войти
            </Button>,
            <Button style={{color: '#adc6ff'}}
                    onClick={this.login}
            >
              Зарегистироваться
            </Button>
          ]}
        >
          <Row style={{marginBottom: '20px'}}>
            <Col span={8}>
              Email address
            </Col>
            <Col span={16}>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Col>

            <Col span={8}>
              Password
            </Col>
            <Col span={16}>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Col>

          </Row>
        </Modal>

        <Modal
          title="Вам необходимо зарегистироваться"
          visible={visibleError}
          onOk={this.handleVisibleError}
          onCancel={this.handleVisibleError}
        >
        </Modal>
      </>
    )
  }
}


export default Login;

