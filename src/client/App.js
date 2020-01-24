import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class App extends Component {
  state = { username: null , url : ""};

  authorize = () => {
    fetch("http://0.0.0.0:9000/login")
      .then((response) => {
        console.log(response);
        // return responseData;
      })
    }
  clickMe = () => {
    fetch("http://0.0.0.0:9000/login", {redirect: 'follow'})
     .then(function(response) {
       console.log(response)
     }).catch(function() {
        console.log("error");
     });
}
  componentDidMount() {
    console.log(process.env)

    this.setState ({url : "https://accounts.spotify.com/en/authorize?client_id="+process.env.SPOTIPY_CLIENT_ID+"&response_type=code&redirect_uri=http:%2F%2F0.0.0.0:9000%2F&scope=user-read-private%20user-read-email"})
      fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
      // this.fetchUsers();
      //   this.timer = setInterval(() => this.fetchUsers(), 5000);
  }
  render() {
    const { username } = this.state;
    return (
      <div className="mainpage">
        <Container>
          <Row>
            <Col>
              <div className="main">
              <Button variant="primary" size="lg" block onClick={this.clickMe}>
                  Connect with Spotify
                </Button>
              </div>
             </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
