import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class App extends Component {
  state = { username: null ,
            url : "",
            access_token: undefined,
            currently_playing: ""};

   authorize(token) {
    fetch("http://localhost:8080/set/auth" ,
      { method:'POST', body:token})
      .then((response) => {
        console.log(response);
      })
    }

  componentDidMount() {
    const query = window.location.search.substring(1)
    const token = query.split('code=')[1]
    if (token != this.state.access_token){
      this.setState({access_token: token})
      this.authorize(token)
    }

  }
  render() {

    const { username } = this.state;
    return (
      <div className="mainpage">
        <Container>
          <Row>
            <Col>
              <div className="main">
              <Button variant="primary" size="lg" block href="api/auth">
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
