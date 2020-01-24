import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class App extends Component {
  state = { username: null };

  authorize = () => {
    fetch("/api/auth", {
      method: "GET"}
    )}
  componentDidMount() {
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
              <Button variant="primary" size="lg" block href="https://accounts.spotify.com/en/authorize?client_id=8a859eb596cd41cd9a1266058e095af3&response_type=code&redirect_uri=http:%2F%2F0.0.0.0:9000%2F&scope=user-read-private%20user-read-email">
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
