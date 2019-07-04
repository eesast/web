import { Button, Input } from "antd";
import React from "react";
import "./App.css";

interface IAppState {
  username: string;
  password: string;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleLoginButtonPress = () => {
    fetch("http://localhost:28888/v1/testUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });
  };

  render() {
    return (
      <div
        style={{
          height: "100vh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "20vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Input
            style={{ margin: 5 }}
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <Input
            style={{ margin: 5 }}
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <Button style={{ margin: 5 }} onClick={this.handleLoginButtonPress}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
