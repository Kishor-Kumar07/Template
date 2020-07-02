import React, { Component } from 'react';
import {Form,Container,Row,Col,Input,Button,Label, FormFeedback} from 'reactstrap'
import { PDFExport} from "@progress/kendo-react-pdf";
import Parta from './parta'

import './App.css';
import { Document, Page, Text, View, StyleSheet,PDFViewer } from '@react-pdf/renderer';
class template extends Component {

  constructor(){
    super();
    this.state={
        date:'',
        subject:'',
        semester:'',
        course:'',
        regulation:'',
        time:'',
        marks:'',
        touched:
          {
            date:false,
            subject:false,
            semester:false,
            course:false,
            regulation:false,
            time:false,
            marks:false,
          }
        
      
    }
    this.handleBlur=this.handleBlur.bind(this)
  }

  validate(date,rollno,subject,semester,course,regulation,time,marks){
    const errors={
      date:'',
      subject:'',
      semester:'',
      course:'',
      regulation:'',
      time:'',
      marks:''
    }

    if(this.state.touched.date&&date=='')
      errors.date="Date should not be empty";

    if(this.state.touched.subject&&subject=='')
      errors.subject="Subject should not be empty";

      if(this.state.touched.semester&&semester=='')
      errors.semester="Semester should not be empty";

      if(this.state.touched.course&&course=='')
      errors.course="Course should not be empty";

      if(this.state.touched.regulation&&regulation=='')
      errors.regulation="Regulation should not be empty";

      if(this.state.touched.time&&time=='')
      errors.time="Time should not be empty";

      if(this.state.touched.marks&&marks=='')
      errors.marks="Marks should not be empty";

      return errors;
    
  }

  handleBlur=(field)=>(evt)=>{
    this.setState({
      touched:{...this.state.touched,[field]:true}
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.state[name] = value; 
  };

    

  render(){
    
    const errors=this.validate(this.state.date,this.state.rollno,this.state.subject,this.state.semester,this.state.course,this.state.regulation,this.state.time,this.state.marks)
    return(
        <Container>
          
          
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <Row className="form-group">
              <Col md={3}>
                <Input type="date" className="form-control" style={{textAlign:'center'}} onChange={this.handleChange}
                onBlur={this.handleBlur('date')}
              
                invalid={errors.date!==''}
                 id="date" name="date" placeholder="Date"/>
                 <FormFeedback>{errors.date}</FormFeedback>
              </Col>
              <Col md={3} className="offset-md-6">
                <Label type="text" className="form-control" style={{textAlign:'center'}}
                 id="rollno" name="rollno" value="Roll Number">Roll Number</Label>
              </Col>
              
          </Row>
          <Row className="form-group row-align">
              <Col md={6}>
                <Input style={{textAlign:'center'}}  type="text" className="form-control"
                onBlur={this.handleBlur('subject')}
                
                invalid={errors.subject!==''}
                 onChange={this.handleChange} id="subject" name="subject" placeholder="Subject"/>
                 <FormFeedback>{errors.subject}</FormFeedback>
              </Col>
              
          </Row>
          <Row className="form-group row-align">
              <Col md={3}>
              <Input style={{textAlign:'center'}} type="select" className="form-control"
              onBlur={this.handleBlur('semester')}
              invalid={errors.semester!==''} onChange={this.handleChange} id="semester" name="semester" placeholder="Semester">
                <option value=""style={{textAlign:'center'}}>--Select Exam--</option>
                <option value="Assessment-I">Assessment-I</option>
                <option value="Assessment-II">Assessment-II</option>
                <option value="Semester">Semester</option>
                </Input>
            <FormFeedback>{errors.semester}</FormFeedback>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={6}>
                <Input style={{textAlign:'center'}} type="text" className="form-control"
                onBlur={this.handleBlur('course')}
                invalid={errors.course!==''} onChange={this.handleChange} id="course" name="course" placeholder="Course"/>
                <FormFeedback>{errors.course}</FormFeedback>
              </Col>
          </Row>
          <Row className="form-group row-align">
              <Col md={3}>
                <Input style={{textAlign:'center'}} type="text" className="form-control"
                onBlur={this.handleBlur('regulation')} 
                invalid={errors.regulation!==''} onChange={this.handleChange} id="regulation" name="regulation" placeholder="Regulation"/>
                <FormFeedback>{errors.regulation}</FormFeedback>
              </Col>
          </Row>
          <Row className="form-group">
              <Col md={3}>
              <Input type="select" style={{textAlign:'center'}} className="form-control"
              onBlur={this.handleBlur('time')} 
              invalid={errors.time!==''} onChange={this.handleChange} id="time" name="time" placeholder="Time">
              <option value="">--Select Time--</option>
              <option value="1.5 hrs">1.5 hrs</option>
              <option value="3 hrs">3 hrs</option>
                </Input>
                <FormFeedback>{errors.time}</FormFeedback>
              </Col>
              <Col md={3} className="offset-md-6">
              <Input type="select" style={{textAlign:'center'}} className="form-control"
              onBlur={this.handleBlur('marks')} 
              invalid={errors.marks!==''} onChange={this.handleChange} id="marks" name="marks" placeholder="Total Marks">
              <option value="">--Select Total Marks--</option>
              <option value="50">50</option>
              <option value="100">100</option>
                </Input>
               <FormFeedback>{errors.marks}</FormFeedback>
              </Col>
          </Row>
          <hr/>
          <Parta header={this.state}/>
          <hr/>
          </Form>
         
    
      </Container>
    )
  }

 
}
 export default template;

// class ImageUpload extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       file: '',
//       imagePreviewUrl: ''
//     };
//     this._handleImageChange = this._handleImageChange.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//   }

//   _handleSubmit(e) {
//     e.preventDefault();
//     // TODO: do something with -> this.state.file
//   }

//   _handleImageChange(e) {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];

//     reader.onloadend = () => {
//       this.setState({
//         file: file,
//         imagePreviewUrl: reader.result
//       });
//     }

//     reader.readAsDataURL(file)
//   }

//   render() {
//     let {imagePreviewUrl} = this.state;
//     let $imagePreview = null;
//     if (imagePreviewUrl) {
//       $imagePreview = (<img style={{paddingLeft:'20px'}}height="300px" src={imagePreviewUrl} />);
//     }

//     return (
//       <div>
//         <form onSubmit={this._handleSubmit}>
//           <input type="file" onChange={this._handleImageChange} />
//           {/* <button type="submit" onClick={this._handleSubmit}>Upload Image</button> */}
//         </form>
//         {$imagePreview}
//         <br/>
//         <input type="file" onChange={this._handleImageChange} />
//       </div>
//     )
//   }

// }
// export default ImageUpload;

// import React, { Component } from 'react'
 
// import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
 
 
// const styleH1 = {
//   fontSize: '15px',
//   textAlign: 'center',
//   color: 'red'
// };
 
// const invisibleStyle = {
//   display: 'none',
// };
 
// export default class App extends Component {
//   render () {
//     const properties = { header: 'Acme' }
//     const head = [["ID", "Name", "Country"]]
//     const body = [
//         [1, "Shaw", "Tanzania"],
//         [2, "Nelson", "Kazakhstan"],
//         [3, "Garcia", "Madagascar"],
//     ]
//     return (
//       <React.Fragment>
//         <PDF
//           properties={properties}
//           preview={true}
//         >
//           <Text x={25} y={45} size={40}>Octonyan loves jsPDF</Text>
//           {/* <Image src={} x={15} y={40} width={180} height={180} /> */}
//           <AddPage />
//           <Table
//             head={head}
//             body={body}
//           />
//           <AddPage format='a6' orientation='l' />
//           <Text x={10} y={10} color='red'>Sample</Text>
//           <Line x1={20} y1={20} x2={60} y2={20}/>
//           <AddPage />
//           <Html sourceById='page' />
//         </PDF>
//         <div id="page" style={invisibleStyle}>
//           <h1 style={styleH1}>Source Html</h1>
//             <p>
//               <strong>lorem ipsumLorem </strong>Ipsum is simply dummy text of the printing and
//               typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
//               since the 1500s, when an unknown printer took a galley of type and scrambled it to
//               make a type specimen book. It has survived not only five centuries, but also the
//               leap into electronic typesetting, remaining essentially unchanged. It was popularised
//               in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
//               and more recently with desktop publishing software like Aldus PageMaker including
//               versions of Lorem Ipsum.
//             </p>
//         </div>
//       </React.Fragment>
//     )
//   }
// }

// import React from 'react';
// import jsPDF from 'jspdf'

// class App extends React.Component {
   
//     constructor(props) {
//         super(props)
//         this.state ={}
//     };

//     generatePDF = () => {
//       var doc = new jsPDF('p', 'pt');
      
//       doc.text(20, 20, 'This is the first title.')

//       doc.setFont('helvetica')
//       doc.setFontType('normal')
//       doc.text(20, 60, 'This is the second title.')

//       doc.setFont('helvetica')
//       doc.setFontType('normal')
//       doc.text(20, 100, 'This is the thrid title.')      

      
//       doc.save('demo.pdf')
//     }   
    
//    render() {
//       return (
//          <div>
//             <button onClick={this.generatePDF} type="primary">Download PDF</button> 
//          </div>
//       );
//    }
// }

// export default App;