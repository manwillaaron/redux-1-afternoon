import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ADD_INSTRUCTION, CREATE_RECIPE, RESET_INPUT } from '../../store'
import store from '../../store'


class Instructions extends Component {
  constructor(props) {
    super(props);
    const reduxState = store.getState()
    this.state = {
      instructions: reduxState.instructions,
      input: ""
    };
  }

  componentDidMount(){
    store.subscribe( () => {
      const reduxState = store.getState()
      this.setState({ instructions: reduxState.instructions })
    })
  }
 
  addInstruction() {
    store.dispatch({type: ADD_INSTRUCTION, payload: this.state.input})
    this.setState({
      input: "",
      
    });
  }

  handleChange(val) {
    this.setState({
      input: val
    });
  }

  reset() {
    store.dispatch({type: RESET_INPUT})
  }
  

  create() {
    store.dispatch({ type: CREATE_RECIPE})

  }
  render() {
    const instructions = this.state.instructions.map((instruction, i) => {
      return <li key={i}>{instruction}</li>;
    });
    return (
      <div className="List forms">
        <h2>Instructions:</h2>
        <div className="form_items_container">
          <ol className='list'>{instructions}</ol>
        </div>
        <div className="add_container">
          <input
            value={this.state.input}
            onChange={e => this.handleChange(e.target.value)}
          />
          <button className="add_button" onClick={() => this.addInstruction()}>
            Add Instruction
          </button>
        </div>
        <Link to="/add/ingredients">
          <button className='left_button'>Previous</button>
        </Link>
        <Link to="/">
          <button className='right_button' 
          onClick={() => this.create() & this.reset()}
          
          >Create</button>
        </Link>
      </div>
    );
  }
}

export default Instructions;
