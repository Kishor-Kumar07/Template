import React, { Component } from "react";
import {Row,Col,Input, Label, Button, FormFeedback} from 'reactstrap'
import Partc from './partc'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Math from './math' 
import 'katex/dist/katex.min.css';

class Partb extends Component {
  constructor(){
    super();
   
    this.state={
      subload:false,
      total:'',
      touched:[
        {
          total:false
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

  handleBlur=(field)=>(evt)=>{
    this.setState({
      touched:{...this.state.touched,[field]:true}
    })
  }
 
  render(){
    const errors=this.validate(this.state.total)
    return (
      <div> 
      <Row className="form-group row-align">
                          <Col md={3} className="offset-md-4">
                              <Label  className="form-control" id="part-a" align="center">PART-B</Label>
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
          <Row className="form-group" key={id}>
          <Col md={1}>
          {this.state.qp.length !== 1 && x.subqp.length<1 &&<Button onClick={e=>this.submit(e,id)}>Del</Button>}
          </Col>
             
                <Col md={1}>
                  {this.state.qp[id].subqp.length!==0?<Label type="number" className="form-control" id="q_no" name="id">
                    {this.props.id+1+id+"."+this.state.sub[0]+")"}</Label>
                  :<Label type="number" className="form-control" id="q_no" name="id">{this.props.id+1+id}</Label>}
                   
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
                    <Label type="number" className="form-control" id="q_no" name="id">{this.props.id+1+id+"."+this.state.sub[subid+1]+")"}</Label>
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
        <Partc idb={this.props.id+this.state.qp.length} id_a={this.props.id} id_b={this.state.qp.length} sab={this.props.sa} sb={this.state} header={this.props.header} totala={this.props.total} totalb={this.state.total}/>
      </div>
    );
}}
 
export default Partb;
 