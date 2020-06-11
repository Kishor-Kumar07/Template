import React, { Component } from "react";
import {Row,Col,Input, Label, Button,FormFeedback} from 'reactstrap'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Partb from './partb'
import Popup from 'reactjs-popup';
import Math from './math' 
import 'katex/dist/katex.min.css';

class Parta extends Component {
  constructor(){
    super();
   
    this.state={
      subload:false,
      total:'',
      touched:[
        {
          total:false,
          question:false,
          mark:false
        }
      ],
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
    this.handleBlur=this.handleBlur.bind(this)
  }


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

  validateQp(question,mark){
    const errors={
      question:'',
      mark:''
    }

    if(this.state.touched.question&&question=='')
      errors.question="Question should not be empty";

    return errors;
  }

    submit (e,id) {
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

    handleBlur=(field)=>(evt)=>{
      this.setState({
        touched:{...this.state.touched,[field]:true}
      })
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
   handleAddClick = (e) => {
    this.setState((prevState)=>({
      qp:[...prevState.qp,{question:"",mark:"",subqp:[]}]
    }))
  };

  handleSubClick = index => {
    this.state.qp[index].subqp.push({question:"",mark:""})
    this.setState({subload:true})

  };
 
  render(){
    //console.log(this.state.total)
    const errors=this.validate(this.state.total)
  return (
    <div> 
    <Row className="form-group row-align">
                        <Col md={3} className="offset-md-4">
                            <Label  className="form-control" id="part-a" align="center">PART-A</Label>
                        </Col>
                        <Col md={1}>
                       { <Button id="button" className="partabut" color="primary" onClick={this.handleAddClick}>Add</Button>}
                       </Col>
                        <Col md={3} className="offset-md-1">
                            <Input type="number" className="form-control"
                             onBlur={this.handleBlur('total')}
                           
                             invalid={errors.total!==''} name="total" onChange={this.handletotal} placeholder="Total Mark"/>
                             <FormFeedback>{errors.total}</FormFeedback>
                        </Col>
                        
                </Row>
      {
      this.state.qp.map((x,id) => {
        return (
              <div>
                {this.validateQp(x.question,x.mark)}
        <Row className="form-group" key={id}>
          <Col md={1}>
          {this.state.qp.length !== 1 && x.subqp.length<1 &&<Button onClick={e=>this.submit(e,id)}>Del</Button>}
          </Col>
             
              <Col md={1}>
                {this.state.qp[id].subqp.length!==0?<Label type="number" className="form-control" id="q_no" name="id">
                  {id+1+"."+this.state.sub[0]+")"}</Label>
                :<Label type="number" className="form-control" id="q_no" name="id">{id+1}</Label>}
                 
              </Col>
              <Col md={8}>
                  <Input name="question" className="form-control" placeholder="Questions"
                     onBlur={this.handleBlur('question')}
                           
                     invalid={errors.question!==''} value={x.question} onChange={e => this.handleInputChange(e, id)}/>
                  <Math ques={x.question}/>
                  <FormFeedback>{errors.question}</FormFeedback>
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
                  <Label type="number" className="form-control" id="q_no" name="id">{id+1+"."+this.state.sub[subid+1]+")"}</Label>
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
      <Partb id={this.state.qp.length} sa={this.state} header={this.props.header} total={this.state.total}/>     
    </div>
  );
}}
 
export default Parta;