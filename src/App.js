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

  return (
    <div style={styles.card}>
      {udata.login ? (
        <div style={styles.cardImg}>
          <div>
            <img
              style={styles.img}
              className="imge"
              src={udata?.avatar_url}
              alt="  "
            />
          </div>
          <div className="details">
            <div className="compon">Followers: {udata?.followers}</div>
            <div className="compon">Following: {udata?.following}</div>
            <div className="compon">Public repos: {udata?.public_repos}</div>

            <div className="urls">Page: {udata?.url}</div>
          </div>
        </div>
      ) : (
        <div>
          <p>No Data Available</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    borderRadius: 5
  },
  cardImg: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "rgba(0,0,0,0.7)"
  },
  img: {
    marginRight: 10,
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden"
  }
};
