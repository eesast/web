import { Button, Icon, Input } from "antd";
import React from "react";
import "./App.css";

class App extends React.Component<
  {},
  {
    username: string;
    password: string;
    usernameValidity: boolean;
    passwordValidity: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameValidity: false,
      passwordValidity: false
    };
  }

  handleUsernameChange = (e: any) => {
    this.setState({
      username: e.target.value,
      usernameValidity: e.target.validity.valid
    });
  };

  handlePasswordChange = (e: any) => {
    this.setState({
      password: e.target.value,
      passwordValidity: e.target.validity.valid
    });
  };

  onSubmit = () => {
    if (!this.state.usernameValidity) {
      alert("Invalid username.");
      return;
    }
    if (!this.state.passwordValidity) {
      alert("Invalid password.");
      return;
    }
    fetch("http://localhost:28888/v1/testUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
  };

  render() {
    return (
      <div className="App" style={{ alignItems: "center" }}>
        <header className="App-header">
          <Input
            placeholder="Username"
            type="text"
            required={true}
            pattern="^[a-zA-Z0-9]+$"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            style={{ width: 200, marginBottom: 10 }}
            onChange={this.handleUsernameChange}
          />
          <Input.Password
            placeholder="Password"
            type="text"
            required={true}
            pattern="^[a-zA-Z0-9~!@&%#_]+$"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            style={{ width: 200, marginBottom: 10 }}
            onChange={this.handlePasswordChange}
          />
          <Button onClick={this.onSubmit}>Login</Button>
        </header>
      </div>
    );
  }
}

export default App;
