import React, { Component } from 'react';
import {Form,Container,Row,Col,Input,Button} from 'reactstrap'
import { PDFExport} from "@progress/kendo-react-pdf";
import Parta from './parta'
import './App.css';
import { Document, Page, Text, View, StyleSheet,PDFViewer } from '@react-pdf/renderer';
class template extends Component {

  constructor(){
    super();
    this.state={
      header:
        {
        date:null,
        subject:null,
        semester:null,
        course:null,
        regulation:null,
        time:null,
        marks:null
        }
      
    }
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.state.header[name] = value; 
  };

    

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
                <Input style={{textAlign:'center'}}  type="text" className="form-control" onChange={this.handleChange} id="subject" name="subject" placeholder="Subject"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={3}>
                <Input style={{textAlign:'center'}} type="text" className="form-control" onChange={this.handleChange} id="semester" name="semester" placeholder="Semester"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={6}>
                <Input style={{textAlign:'center'}} type="text" className="form-control" onChange={this.handleChange} id="course" name="course" placeholder="Course"/>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={3}>
                <Input style={{textAlign:'center'}} type="text" className="form-control" onChange={this.handleChange} id="regulation" name="regulation" placeholder="Regulation"/>
              </Col>
          </Row>
          <Row className="form-group">
              <Col md={3}>
                <Input type="text" className="form-control" onChange={this.handleChange} id="time" name="time" placeholder="Time"/>
              </Col>
              <Col md={3} className="offset-md-6">
              <Input type="number" className="form-control" onChange={this.handleChange} id="marks" name="marks" placeholder="Total Marks"/>
              </Col>
          </Row>
          <hr/>
          <Parta header={this.state.header}/>
          <hr/>
          </Form>
         
    
      </Container>
    )
  }

 
}
 export default template;



