import React, { Component } from 'react';
import {Form,Container,Row,Col,Input} from 'reactstrap'
import Parta from './parta'


import './App.css';

class template extends Component {

  render(){
    
    return(
        <Container>
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Row className="form-group row-align">
              <Col md={3} className=" offset-md-9">
                <Input type="date" className="form-control" onChange={this.handleChange} id="date" name="date" placeholder="Date"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={6}>
                <Input type="text" className="form-control" onChange={this.handleChange} id="subject" name="subject" placeholder="Subject"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={3}>
                <Input type="text" className="form-control" onChange={this.handleChange} id="semester" name="semester" placeholder="Semester"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={6}>
                <Input type="text" className="form-control" onChange={this.handleChange} id="course" name="course" placeholder="Course"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={3}>
                <Input type="text" className="form-control" onChange={this.handleChange} id="regulation" name="regulation" placeholder="Regulation"/>
              </Col>
          </Row>
          <Row className="form-group">
              <Col md={3}>
                <Input type="text" className="form-control" onChange={this.handleChange} id="time" name="time" placeholder="Time"/>
              </Col>
              <Col md={3} className="offset-md-6">
              <Input type="number" className="form-control" onChange={this.handleChange} id="mark" name="mark" placeholder="Total Marks"/>
              </Col>
          </Row>
          <hr/>
          <Parta/>
          <hr/>
        </Form>
      </Container>
   
    )
  }
  
}

export default template;
