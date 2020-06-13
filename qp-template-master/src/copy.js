Gmail	Dinesh Kumar <dkdinesh6688@gmail.com>
Re: Webex meeting invitation: Qp-Template-Demo
kishor kumar <kishorck00@gmail.com>	Fri, Jun 12, 2020 at 12:08 PM
To: dkdinesh6688@gmail.com
import React, { Component } from "react";
import {Row,Col,Input, Label, Button, FormFeedback} from 'reactstrap'
import Math from './math' 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './App.css';
import 'katex/dist/katex.min.css';
import { PDFViewer,Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Popup from 'reactjs-popup';
import Mydoc from './mydoc.js';
import Scroll from 'react-scroll';
import { PDFExport } from "@progress/kendo-react-pdf";

var qpaMark=0
var qpbMark=0
var qpcMark=0

class Partc extends Component {
 
 constructor(props){
 super(props);
 
 this.state={
 subload:false,
 noMatch:false,
 noMatchA:false,
 noMatchB:false,
 noMatchC:false,
 total:'',
 touched:[
 {
 total:false
 }
 ],
 open:false,
 sub:["a","b","c","d"],
 qp:
 [
 {
 
 question:"",
 mark:"",
 touched:{
 question:false,
 mark:false,
 },
 file: '',
 imagePreviewUrl: '',
 errors:{
 question :"error",
 mark:"error"
 },
 subqp:
 [
 
 ]
 }
 ]
 
 }
 this.handleBlur=this.handleBlur.bind(this)
 this._handleImageChange = this._handleImageChange.bind(this);
 this._handleImageSubChange = this._handleImageSubChange.bind(this);
 this._handleSubmit = this._handleSubmit.bind(this);
 }

 handleBlurTotal=(field)=>(evt)=>{
 this.setState({
 touched:{...this.state.touched,[field]:true}
 })
 }

 _handleSubmit(e) {
 e.preventDefault();
 // TODO: do something with -> this.state.file
 }

 _handleImageChange(e,index) {
 e.preventDefault();

 let reader = new FileReader();
 let file = e.target.files[0];

 reader.onloadend = () => {
 const list = [...this.state.qp];
 list[index].file =file;
 list[index].imagePreviewUrl=reader.result; 
 this.setState({
 qp:list
 });
 }
 if(file)
 reader.readAsDataURL(file)
 }
 _handleImageSubChange(e,id,index) {
 e.preventDefault();

 let reader = new FileReader();
 let file = e.target.files[0];

 reader.onloadend = () => {
 this.state.qp[id].subqp[index].file=file;
 this.state.qp[id].subqp[index].imagePreviewUrl=reader.result;
 this.setState(
 this.state.qp[id].subqp[index]
 );
 }
 if(file)
 reader.readAsDataURL(file)
 }
 submit = (e,id) => {
 e.preventDefault();
 confirmAlert({
 customUI: ({ onClose }) => {
 return (
 <div className='custom-ui'>
 <h1>Are you sure?</h1>
 <p>You want to delete this Question
 ?</p>
 <button onClick={onClose}>Cancel</button>
 <div>
 <button
 onClick={() => {
 this.handleRemoveClick(id);
 onClose();
 }}
 >
 Yes, Delete it!
 </button>
 </div>
 </div>
 );
 }
 });
 };

 submitsub (e,id,subid) {
 e.preventDefault();
 confirmAlert({
 customUI: ({ onClose }) => {
 return (
 <div className='custom-ui'>
 <h1>Are you sure?</h1>
 <p>You want to delete this Question
 ?</p>
 <button onClick={onClose}>Cancel</button>
 <div>
 <button
 onClick={() => {
 this.handleRemovesubClick(id,subid);
 onClose();
 }}
 >
 Yes, Delete it!
 </button>
 </div>
 </div>
 );
 }
 });
 };
 

 handletotal=e=>{
 const {value} = e.target;
 this.setState({total:value})
 }

 validate(total){
 const errors={
 total:'',
 }

 if(this.state.touched.total&&total=='')
 errors.total="Total should not be empty";

 return errors;
 }
 validateQp(question,mark,id){
 if(this.state.qp[id].touched.question&&question=='')
 this.state.qp[id].errors.question="Question should not be empty";
 if(this.state.qp[id].touched.mark&&mark=='')
 this.state.qp[id].errors.mark="Mark should not be empty";
 
 }
 validateSubQp(question,mark,id,subid){
 if(this.state.qp[id].subqp[subid].touched.question&&question=='')
 this.state.qp[id].subqp[subid].errors.question="Question should not be empty";
 if(this.state.qp[id].subqp[subid].touched.mark&&mark=='')
 this.state.qp[id].subqp[subid].errors.mark="Mark should not be empty";
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
 if(name=="question"&&list[index][name]!='')
 {
 list[index].errors.question='error';
 this.setState({qp:list})
 }
 if(name=="mark"&&list[index][name]!='')
 {
 list[index].errors.mark='error';
 this.setState({qp:list})
 }
 this.setState({qp:list})
 };

 handleInputsubChange = (e, index,subid) => {
 const { name, value } = e.target;
 this.state.qp[index].subqp[subid][name] = value;
 if(name=="question"&&this.state.qp[index].subqp[subid].question!=''){
 this.state.qp[index].subqp[subid].errors.question='error'
 this.setState(this.state.qp[index].subqp[subid])
 }
 if(name=="mark"&&this.state.qp[index].subqp[subid].mark!=""){
 this.state.qp[index].subqp[subid].errors.mark='error'
 this.setState(this.state.qp[index].subqp[subid])
 }
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
 qp:[...prevState.qp,{question:"",mark:"",subqp:[],touched:{
 question:false,
 mark:false,
 },
 file: '',
 imagePreviewUrl: '',
 errors:{
 question :"error",
 mark:"error"
 }}]
 }))
 };

 handleSubClick = index => {
 this.state.qp[index].subqp.push({question:"",mark:"",file: '',
 imagePreviewUrl: '',touched:{
 question:false,
 mark:false,
 },
 errors:{
 question :"error",
 mark:"error"
 }})
 this.setState({subload:true})
 };

 onClick = (e) => {
 e.preventDefault();
 var qpa=''+qpaMark
 var tota=''+(this.props.sab.total)
 var qpb=''+qpbMark
 var totb=''+(this.props.sb.total)
 var qpc=''+qpcMark
 var totc=''+(this.state.total)
 var tot=''+this.props.header.marks
 // console.log(tot)
 var total=parseInt(this.props.sab.total)+parseInt(this.props.sb.total)+parseInt(this.state.total)
 //console.log(total)
 var total_abc=''+total
 // console.log(typeof(total_abc))
 if(qpa!=tota){ 
 this.state.noMatchA=true
 }
 if(qpa==tota){
 this.state.noMatchA=false
 }
 if(qpb!=totb){ 
 this.state.noMatchB=true
 }
 if(qpb==totb){
 this.state.noMatchB=false
 }
 if(qpc!=totc){ 
 this.state.noMatchC=true
 }
 if(qpc==totc){
 this.state.noMatchC=false
 }
 if(tot!=total_abc){ 
 this.state.noMatch=true
 console.log(this.state.noMatch)
 }
 if(tot==total_abc){
 this.state.noMatch=false
 console.log(this.state.noMatch)
 }
 if(this.state.noMatch){
 alert("Total is not equal")
 }
 else if(this.state.noMatchA){
 alert("Total is not equal in Part-A")
 }
 else if(this.state.noMatchB){
 alert("Total is not equal in Part-B")
 }
 else if(this.state.noMatchC){
 alert("Total is not equal in Part-C")
 }
 if(this.state.noMatchA||this.state.noMatchB||this.state.noMatchC||this.state.noMatch){
 this.setState({open:false})
 }
 else{
 this.setState({open:true})
 }
 //this.setState({open:true})
}

handleBlur=(field,id)=>(evt)=>{
 const list = [...this.state.qp];
 list[id].touched[field] = true; 
 this.setState({qp:list})
}

handleBlurSubQp=(field,index,subid)=>(evt)=>{
 console.log(this.state.qp[index].subqp[subid].touched[field])
 this.state.qp[index].subqp[subid].touched[field]=true;
 this.setState(this.state.qp[index].subqp[subid])
 }

 handlecheck(){
 var qpamark=0;
 var qpasubmark=0;
 var qpbmark=0;
 var qpbsubmark=0;
 var qpcmark=0;
 var qpcsubmark=0;
 this.props.sab.qp.map((x,id)=>{
 qpamark=qpamark+parseInt(x.mark)
 this.props.sab.qp[id].subqp.map((xb,id)=>{
 qpasubmark=qpasubmark+parseInt(xb.mark)
 })
 })
 qpaMark=qpamark+qpasubmark
 // console.log(qpaMark)
 
 this.props.sb.qp.map((x,id)=>{
 qpbmark=qpbmark+parseInt(x.mark)
 this.props.sb.qp[id].subqp.map((xb,id)=>{
 qpbsubmark=qpbsubmark+parseInt(xb.mark)
 })
 })
 qpbMark=qpbmark+qpbsubmark
 //console.log(qpbMark)
 
 this.state.qp.map((x,id)=>{
 qpcmark=qpcmark+parseInt(x.mark)
 this.state.qp[id].subqp.map((xb,id)=>{
 qpcsubmark=qpcsubmark+parseInt(xb.mark)
 })
 })
 qpcMark=qpcmark+qpcsubmark
 // console.log(qpcMark)
 }

 
 
 render(){
 const errors=this.validate(this.state.total)
 return (
 <div> 
 <Row className="form-group row-align">
 <Col md={3} className="offset-md-4">
 <Label className="form-control" id="part-a" align="center">PART-C</Label>
 </Col>
 <Col md={1}>
 { <Button id="button" className="partabut" color="primary" onClick={this.handleAddClick}>Add</Button>}
 </Col>
 <Col md={3} className="offset-md-1">
 <Input type="number" className="form-control"
 onBlur={this.handleBlurTotal('total')}
 
 invalid={errors.total!==''} name="total" onChange={this.handletotal} placeholder="Total Mark"/>
 <FormFeedback>{errors.total}</FormFeedback>
 </Col>
 
 </Row>
 {
 this.state.qp.map((x,id) => {
 return (
 <div>
 {this.validateQp(x.question,x.mark,id)}
 <Row className="form-group" key={id}>
 <Col md={1}>
 {this.state.qp.length !== 1 && x.subqp.length<1 &&<Button onClick={e=>this.submit(e,id)}>Del</Button>}
 </Col>
 
 
 <Col md={1}>
 {this.state.qp[id].subqp.length!==0?<Label type="number" className="form-control" id="q_no" name="id">
 {this.props.idb+1+id+"."+this.state.sub[0]+")"}</Label>
 :<Label type="number" className="form-control" id="q_no" name="id">{this.props.idb+1+id}</Label>}
 
 </Col>
 <Col md={8}>
 <Input name="question" className="form-control" placeholder="Questions"
 onBlur={this.handleBlur('question',id)}
 invalid={x.errors.question!=='error'} value={x.question} onChange={e => this.handleInputChange(e, id)}/>
 <Math ques={x.question}/>
 <FormFeedback>{x.errors.question}</FormFeedback>
 <Input type="file" onChange={e=>this._handleImageChange(e,id)} />
 <img style={{paddingLeft:'20px'}}height="300px" src={x.imagePreviewUrl} />
 </Col>
 <Col md={1}>
 <Input type="number" className="form-control ml10" name="mark" placeholder="M"
 onBlur={this.handleBlur('mark',id)}
 invalid={x.errors.mark!=='error'} value={x.mark} onChange={e => this.handleInputChange(e, id)}/>
 <FormFeedback>{x.errors.mark}</FormFeedback>
 </Col>
 <Col md={1}>
 {<Button id ="button" className="partabut" onClick={()=>this.handleSubClick(id)}>Sub</Button>}
 </Col>
 </Row> 
 <div>{this.state.qp[id].subqp.map((xb,subid)=><div>
 {this.validateSubQp(xb.question,xb.mark,id,subid)}
 <Row className="form-group" key={id}>
 <Col md={1}>
 {<Button onClick={e=>this.submitsub(e,id,subid)}>Del</Button>}
 </Col>
 <Col md={1}>
 <Label type="number" className="form-control" id="q_no" name="id">{this.props.idb+1+id+"."+this.state.sub[subid+1]+")"}</Label>
 </Col>
 <Col md={8}>
 <Input name="question" className="form-control" placeholder="Questions"
 onBlur={this.handleBlurSubQp("question",id,subid)}
 invalid={xb.errors.question!=='error'} value={xb.question} onChange={e => this.handleInputsubChange(e, id, subid)}/>
 <FormFeedback>{xb.errors.question}</FormFeedback>
 <Math ques={xb.question}/>
 <Input type="file" onChange={e=>this._handleImageSubChange(e,id,subid)} />
 <img style={{paddingLeft:'20px'}}height="300px" src={xb.imagePreviewUrl} />
 </Col>
 <Col md={1}>
 <Input type="number" className="form-control ml10" name="mark" placeholder="M"
 onBlur={this.handleBlurSubQp("mark",id,subid)}
 invalid={xb.errors.mark!=='error'} value={xb.mark} onChange={e => this.handleInputsubChange(e, id,subid)}/>
 <FormFeedback>{xb.errors.mark}</FormFeedback>
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
 {this.handlecheck()}
 <div>
 
 <button className="button" onClick={this.onClick}>
 Preview
 </button>
 
 <Popup
 open={this.state.open}
 modal
 closeOnDocumentClick
 onClose={this.closeModal}
 style={{overflow:'scroll'}}
 >
 
 <Scroll.Element className="element" style={{overflow:'scroll',position:'relative',height:'620px'}}> 
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
 <Col md={3} className=" offset-md-9">
 <Label >{this.props.header.date}</Label>
 </Col>
 </Row>
 <Row className="form-group row-align">
 <Label style={{textAlign:'center'}}>{this.props.header.subject}</Label>
 </Row>
 <Row className="form-group row-align"> 
 <Label style={{textAlign:'center'}}>{this.props.header.semester}</Label> 
 </Row>
 <Row className="form-group row-align"> 
 <Label style={{textAlign:'center'}}>{this.props.header.course}</Label>
 </Row>
 <Row className="form-group row-align"> 
 <Label style={{textAlign:'center'}}>{this.props.header.regulation}</Label>
 </Row>
 <Row className="form-group">
 <Col md={3} className="offset-md-1">
 <Label >{this.props.header.time}</Label>
 </Col>
 <Col md={1} className="offset-md-6">
 <Label >{this.props.header.marks}</Label>
 </Col>
 </Row>

 <Row className="form-group row-align"> 
 <Label style={{textAlign:'center'}}><b>PART-A</b></Label> 
 <Label>({this.props.totala})</Label> 
 </Row>
 {
 this.props.sab.qp.map((x,id) => {
 return(
 <div>
 <Row>
 <Col md={1} className="offset-md-1">
 {this.props.sab.qp[id].subqp.length!==0?<Label style={{textAlign:'right'}}>
 {1+id+"."+this.state.sub[0]+")"}</Label>
 :<Label style={{textAlign:'right'}}>{1+id}</Label>}
 
 </Col>
 <Col md={8}>
 
 <Math ques={x.question}/>
 <img style={{padding:'15px',paddingLeft:'55px',alignItems:'center',justifyContent:'center'}}height="200px" src={x.imagePreviewUrl} />
 </Col>
 <Col md={1}>
 <Label>{x.mark}</Label>
 </Col>
 </Row>
 
 
 {this.props.sab.qp[id].subqp.map((xb,subid)=>{
 return(
 <Row>
 <Col md={1} className="offset-md-1">
 <Label>{1+id+"."+this.state.sub[subid+1]+")"}</Label>
 </Col>
 <Col md={8}>
 
 <Label><Math ques={xb.question}/></Label>
 <img style={{padding:'15px',paddingLeft:'55px',alignItems:'center',justifyContent:'center'}}height="200px" src={xb.imagePreviewUrl} />
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
 <Label style={{textAlign:'center'}} ><b>PART-B</b></Label> 
 <Label>({this.props.totalb})</Label> 
 </Row>
 {
 this.props.sb.qp.map((x,id) => {
 return(
 <div>
 <Row>
 <Col md={1} className="offset-md-1">
 {this.props.sb.qp[id].subqp.length!==0?<Label>
 {this.props.id_a+1+id+"."+this.state.sub[0]+")"}</Label>
 :<Label>{this.props.id_a+1+id}</Label>}
 
 </Col>
 <Col md={8}>
 
 <Label><Math ques={x.question}/></Label>
 <img style={{padding:'15px',paddingLeft:'55px'}}height="200px" src={x.imagePreviewUrl} />
 </Col>
 <Col md={1}>
 <Label>{x.mark}</Label>
 </Col>
 </Row>
 
 {this.props.sb.qp[id].subqp.map((xb,subid)=>{
 return(
 <Row>
 <Col md={1} className="offset-md-1">
 <Label>{this.props.id_a+1+id+"."+this.state.sub[subid+1]+")"}</Label>
 </Col>
 <Col md={8}>
 
 <Label><Math ques={xb.question}/></Label>
 <img style={{padding:'15px',paddingLeft:'55px'}}height="200px" src={xb.imagePreviewUrl} />
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
 <Label style={{textAlign:'center'}}><b>PART-C</b></Label>
 <Label>({this.state.total})</Label>
 
 </Row>
 {
 this.state.qp.map((x,id) => {
 return(
 <div>
 <Row>
 <Col md={1} className="offset-md-1">
 {this.state.qp[id].subqp.length!==0?<Label>
 {this.props.idb+1+id+"."+this.state.sub[0]+")"}</Label>
 :<Label>{this.props.idb+1+id}</Label>}
 
 </Col>
 <Col md={8}>
 
 <Label><Math ques={x.question}/></Label>
 <img style={{padding:'15px',paddingLeft:'55px'}}height="200px" src={x.imagePreviewUrl} />
 </Col>
 <Col md={1}>
 <Label>{x.mark}</Label>
 </Col>
 </Row>
 
 {this.state.qp[id].subqp.map((xb,subid)=>{
 return(
 <Row>
 <Col md={1} className="offset-md-1">
 <Label>{this.props.idb+1+id+"."+this.state.sub[subid+1]+")"}</Label>
 </Col>
 <Col md={8}>
 
 <Label><Math ques={xb.question}/></Label>
 <img style={{padding:'15px',paddingLeft:'55px'}}height="200px" src={xb.imagePreviewUrl} />
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
 
 <Button onClick={this.exportPDFWithComponent} style={{alignItems:'center'}}>Generate PDF</Button>
 </Popup>
 
 </div>
 
 </div>
 );
 }}
 
export default Partc;

