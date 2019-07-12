import { Button, Icon, Input } from "antd";
import React from "react";
import "./App.css";

class App extends React.Component<{}, { username: string; password: string }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleUsernameChange(e: any) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e: any) {
    this.setState({ password: e.target.value });
  }

  onSubmit() {
    fetch("http://localhost:28888/v1/testUsers", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Input
            placeholder="Username"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            style={{ width: 300 }}
            onChange={this.handleUsernameChange}
          />
          <Input.Password
            placeholder="Password"
            prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
            style={{ width: 300, marginBottom: 5 }}
            onChange={this.handlePasswordChange}
          />
          <Button style={{ width: 300 }} type="primary" onClick={this.onSubmit}>
            Login
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
