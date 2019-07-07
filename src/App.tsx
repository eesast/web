import { Button, Input, Icon } from "antd";
import React from "react";
import "./App.css";
// import logo from "./logo.svg";

class App extends React.Component<{}, { username: string; password: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleUsernameChange = (e: any) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e: any) => {
    this.setState({ password: e.target.value });
  };

  onSubmit = () => {
    console.log(this.state);
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
          {/* {<img src={logo} className="App-logo" alt="logo" />} */}
          {/* <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p> */}
          <Input
            placeholder="Username"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            style={{ width: 200, marginBottom: 10 }}
            onChange={this.handleUsernameChange}
          />
          <Input.Password
            placeholder="Password"
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
