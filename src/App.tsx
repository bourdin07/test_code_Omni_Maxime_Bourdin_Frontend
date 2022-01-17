import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import MyForm from './components/MyForm.component';

function App() {
  return (
    <div className="App">
      <header></header>
      <Container>
        <Row>
          <Col md={1}></Col>
          <Col md={10}>
            <MyForm />
          </Col>
          <Col md={1}></Col>
        </Row>
      </Container>
      <footer></footer>
    </div>
  );
}

export default App;
