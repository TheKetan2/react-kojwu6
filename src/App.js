import React, { Component, useEffect } from "react";
import "./style.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uname: "",
      udata: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    fetch(`https://api.github.com/users/${this.state.uname}`)
      .then(response => response.json())
      .then(data =>
        this.setState({ udata: data }, () => {
          console.log(this.state.udata);
        })
      )
      .catch(error => console.error(error));
  }

  handleInput(event) {
    // console.log(event.target.value);
    this.setState(
      {
        uname: event.target.value
      },
      () => {
        console.log(this.state.uname);
      }
    );
  }
  render() {
    return (
      <div>
        <Form
          handleInput={this.handleInput}
          uname={this.state.uname}
          getUser={this.getUser}
        />
        <Formdata udata={this.state.udata} />
      </div>
    );
  }
}

const Form = props => {
  const { getUser, handleInput, uname } = props;
  return (
    <div className="form">
      <input
        className="textbar"
        placeholder="Search for username"
        value={uname}
        onChange={handleInput}
        name="uname"
      />
      <button className="button" onClick={getUser}>
        Search
      </button>
    </div>
  );
};

const Formdata = ({ udata }) => {
  useEffect(() => {
    console.log(JSON.stringify(udata.login));
  }, [udata]);

  return udata ? (
    <div>
      <img
        style={{ width: 100, height: 100 }}
        className="imge"
        src={udata?.avatar_url}
        alt="  "
      />
      <div className="details">
        <div className="compon">Followers: {udata?.followers}</div>
        <div className="compon">Following: {udata?.following}</div>
        <div className="compon">public repos: {udata?.public_repos}</div>
      </div>
      <div className="urls">Page:{udata?.url}</div>
    </div>
  ) : (
    <div>
      <p>No Data Available</p>
    </div>
  );
};
