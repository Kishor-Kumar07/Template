import React, { Component } from "react";
import {Row,Col,Input, Label, Button} from 'reactstrap'
import Math from './math' 
import './App.css';
import 'katex/dist/katex.min.css';
import { PDFViewer,Page, Text, View, Document, StyleSheet  } from "@react-pdf/renderer";
import Popup from 'reactjs-popup';
import Mydoc from './mydoc.js';
import Scroll from 'react-scroll';
import { PDFExport } from "@progress/kendo-react-pdf";
class Partc extends Component {
  anchor = null;
  constructor(props){
    super(props);
   
    this.state={
      subload:false,
      open:false,
      sub:["a","b","c","d"],
      qp:
      [
        {
          
        question:"",
        mark:"",
      subqp:
          [
           
          ]
        }
    ]
    
    }
  }
  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
};
    openModal=(event) =>{
      event.preventDefault();
      this.setState({ open: true });
    }
    closeModal=(event)=> {
      
      this.setState({ open: false });
    }
  

  // handle input change
   handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...this.state.qp];
    list[index][name] = value; 
    this.setState({qp:list})
  };

  handleInputsubChange = (e, index,subid) => {
    const { name, value } = e.target;
    this.state.qp[index].subqp[subid][name] = value;
    this.setState(this.state.qp[index].subqp[subid])
  };
 
  // handle click event of the Remove button
   handleRemoveClick = index => {
    const list = [...this.state.qp];
    list.splice(index, 1);
    this.setState({qp:list})
  };

  handleRemovesubClick = (index,subid) => {
    this.state.qp[index].subqp.splice(subid, 1);
    this.setState(this.state.qp[index].subqp)
  };
 
  // handle click event of the Add button
   handleAddClick = (id) => {
    this.setState((prevState)=>({
      qp:[...prevState.qp,{question:"",mark:"",subqp:[]}]
    }))
  };

  handleSubClick = index => {
    this.state.qp[index].subqp.push({question:"",mark:""})
    this.setState({subload:true})
  };

  onClick = (e) => {
    e.preventDefault();
    this.setState({ open: true });
}
  render(){

  return (
    <div> 
    <Row className="form-group row-align">
                        <Col md={3} className="offset-md-4">
                            <Label  className="form-control" id="part-a" align="center">PART-C</Label>
                        </Col>
                        <Col md={1}>
                       { <Button id="button" className="partabut" color="primary" onClick={this.handleAddClick}>Add</Button>}
                       </Col>
                        <Col md={3} className="offset-md-1">
                            <Input type="number" className="form-control" id="part-a_mark" placeholder="Total Mark"/>
                        </Col>
                        
                </Row>
      {
      this.state.qp.map((x,id) => {
        return (
              <div>
        <Row className="form-group" key={id}>
              <Col md={1}>
                  {this.state.qp.length !== 1 && 
                  <Button id ="button" className="partabut" color="danger" onClick={() => this.handleRemoveClick(id)}>Del</Button>}
              </Col>
              <Col md={1}>
                {this.state.qp[id].subqp.length!==0?<Label type="number" className="form-control" id="q_no" name="id">
                  {this.props.idb+1+id+"."+this.state.sub[0]+")"}</Label>
                :<Label type="number" className="form-control" id="q_no" name="id">{this.props.idb+1+id}</Label>}
                 
              </Col>
              <Col md={8}>
                  <Input name="question" className="form-control" placeholder="Questions"
                      value={x.question} onChange={e => this.handleInputChange(e, id)}/>
                  <Math ques={x.question}/>
              </Col>
              <Col md={1}>
                <Input type="number" className="form-control ml10" name="mark" placeholder="M"
                      value={x.mark} onChange={e => this.handleInputChange(e, id)}/>
              </Col>
              <Col md={1}>
                  {<Button id ="button" className="partabut" onClick={()=>this.handleSubClick(id)}>Sub</Button>}
              </Col>
            </Row>   
            <div>{this.state.qp[id].subqp.map((xb,subid)=><div><Row className="form-group" key={id}>
              <Col md={1}>
                  {
                  <Button id="button" className="partabut" color="danger" onClick={() => this.handleRemovesubClick(id,subid)}>Del</Button>}
              </Col>
              <Col md={1}>
                  <Label type="number" className="form-control" id="q_no" name="id">{this.props.idb+1+id+"."+this.state.sub[subid+1]+")"}</Label>
              </Col>
              <Col md={8}>
                  <Input name="question" className="form-control" placeholder="Questions"
                      value={xb.question} onChange={e => this.handleInputsubChange(e, id, subid)}/>
                      <Math ques={xb.question}/>
              </Col>
              <Col md={1}>
                  <Input type="number" className="form-control ml10" name="mark" placeholder="M"
                      value={xb.mark} onChange={e => this.handleInputsubChange(e, id)}/>
              </Col>
              <Col md={1}>
                  {<Button id ="button" className="partabut" onClick={()=>this.handleSubClick(id)}>Sub</Button>}
              </Col>
                  </Row></div>)}</div>
        </div>    
          );
        }
      )}
      <hr/>  
       <div>
        <button className="button" onClick={this.onClick}>
          Controlled Popup
        </button>
       
        <Popup
          open={this.state.open}
          modal
          closeOnDocumentClick
          onClose={this.closeModal}
          style={{overflow:'scroll'}}
        >
          
         <Scroll.Element className="element" style={{overflow:'scroll',position:'relative',height:'650px'}}> 
          <div>
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
            <PDFExport
        ref={component => (this.pdfExportComponent = component)}
        paperSize="a4"
        margin={40}
        fileName={`Report for ${new Date().getFullYear()}`}
        author="KendoReact Team"
    
        >
            <div>
            <Row className="form-group row-align">
                        <Col md={3} className="offset-md-4">
                            <Label >PART-A</Label>
                        </Col>
                        <Col md={3} className="offset-md-1">
                            <Label>Mark</Label>
                        </Col>
                        
                </Row>
            {
              this.props.sab.qp.map((x,id) => {
              return(
                <div>
                <Row>
                <Col md={1}>
                {this.props.sab.qp[id].subqp.length!==0?<Label>
                  {1+id+"."+this.state.sub[0]+")"}</Label>
                :<Label>{1+id}</Label>}
                 
              </Col>
                  <Col md={8}>
                  
                      <Label><Math ques={x.question}/></Label>
              </Col>
              <Col md={1}>
                  <Label>{x.mark}</Label>
              </Col>
              </Row>
              
                {this.props.sab.qp[id].subqp.map((xb,subid)=>{
                   return(
                    <Row>
                    <Col md={1}>
                  <Label>{1+id+"."+this.state.sub[subid+1]+")"}</Label>
              </Col>
                    <Col md={8}>
                    
                        <Label><Math ques={xb.question}/></Label>
                </Col>
                <Col md={1}>
                    <Label>{xb.mark}</Label>
                </Col>
                </Row>
                   );
                })}
              
              </div>
              );
            })
            }
            </div>
            <div>
            <Row className="form-group row-align">
                        <Col md={3} className="offset-md-4">
                            <Label >PART-B</Label>
                        </Col>
                        <Col md={3} className="offset-md-1">
                            <Label>Mark</Label>
                        </Col>
                        
                </Row>
            {
              this.props.sb.qp.map((x,id) => {
              return(
                <div>
                <Row>
                <Col md={1}>
                {this.props.sb.qp[id].subqp.length!==0?<Label>
                  {this.props.id_a+1+id+"."+this.state.sub[0]+")"}</Label>
                :<Label>{this.props.id_a+1+id}</Label>}
                 
              </Col>
                  <Col md={8}>
                  
                      <Label><Math ques={x.question}/></Label>
              </Col>
              <Col md={1}>
                  <Label>{x.mark}</Label>
              </Col>
              </Row>
              
                {this.props.sb.qp[id].subqp.map((xb,subid)=>{
                   return(
                    <Row>
                    <Col md={1}>
                  <Label>{this.props.id_a+1+id+"."+this.state.sub[subid+1]+")"}</Label>
              </Col>
                    <Col md={8}>
                    
                        <Label><Math ques={xb.question}/></Label>
                </Col>
                <Col md={1}>
                    <Label>{xb.mark}</Label>
                </Col>
                </Row>
                   );
                })}
              
              </div>
              );
            })
            }
            </div>
            <div>
            <Row className="form-group row-align">
                        <Col md={3} className="offset-md-4">
                            <Label >PART-C</Label>
                        </Col>
                        <Col md={3} className="offset-md-1">
                            <Label>Mark</Label>
                        </Col>
                        
                </Row>
            {
              this.state.qp.map((x,id) => {
              return(
                <div>
                <Row>
                <Col md={1}>
                {this.state.qp[id].subqp.length!==0?<Label>
                  {this.props.idb+1+id+"."+this.state.sub[0]+")"}</Label>
                :<Label>{this.props.idb+1+id}</Label>}
                 
              </Col>
                  <Col md={8}>
                  
                      <Label><Math ques={x.question}/></Label>
              </Col>
              <Col md={1}>
                  <Label>{x.mark}</Label>
              </Col>
              </Row>
              
                {this.state.qp[id].subqp.map((xb,subid)=>{
                   return(
                    <Row>
                    <Col md={1}>
                  <Label>{this.props.idb+1+id+"."+this.state.sub[subid+1]+")"}</Label>
              </Col>
                    <Col md={8}>
                    
                        <Label><Math ques={xb.question}/></Label>
                </Col>
                <Col md={1}>
                    <Label>{xb.mark}</Label>
                </Col>
                </Row>
                   );
                })}
              
              </div>
              );
            })
            }
                </div>
                </PDFExport>
          </div>
          
          </Scroll.Element>
          
          <Button onClick={this.exportPDFWithComponent}>Generate PDF</Button>
        </Popup>
        
        </div>
      
    </div>
    );
  }}
 
export default Partc;


