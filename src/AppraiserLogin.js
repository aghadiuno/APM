import React, {Component} from 'react';
import * as firebase from 'firebase';
import {Panel,Well,FormGroup,InputGroup,FormControl,Glyphicon,Button} from 'react-bootstrap';

class AppraiserLogin extends Component{
  constructor(props){
    super(props);
    this.loginHandler = this.loginHandler.bind(this);
  }
  componentDidMount(){

  }
  loginHandler(e){
    e.preventDefault();
    var email= document.getElementById('email').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch((code)=>{
      if(code.code === "auth/user-not-found"){
        alert("No matching user found.\nClick the link below to apply for an account.");
      } else if (code.code === "auth/invalid-email") {
        alert("Please enter a valid email and retry");
      } else if (code.code === "auth/wrong-password") {
        alert("Oops!\n Looks like you typed your password incorrectly");
      } else if (code.code === "auth/user-disabled") {
        alert("Your account has been disabled. Please contact us for assistance");
      } else {
        alert("Hmm...Something went wrong. \n Please try again, contact us if the problem persists");
      }
    })
  }
  render() {
    return (
      <div className="appraiser-login">
        <Panel header="APM | Appraiser Login" bsStyle="primary">
          <form>
            <FormGroup>
                <InputGroup className="input-item">
                  <InputGroup.Addon>
                    <Glyphicon glyph="glyphicon glyphicon-user" />
                  </InputGroup.Addon>
                  <FormControl type="email" name="email" id="email" placeholder="E-mail"/>
                </InputGroup>
              <InputGroup className="input-item">
                <InputGroup.Addon>
                  <Glyphicon glyph="glyphicon glyphicon-lock" />
                </InputGroup.Addon>
                <FormControl type="password" name="password" id="password" placeholder="Password"/>
              </InputGroup>
            </FormGroup>
          </form>
          <Button bsStyle="primary" type="submit" onClick={this.loginHandler}>
            Log-In
          </Button>
          <Well bsSize="small" onClick={()=>this.props.statusHandle('signup')}>{`Don't have an account? Apply for one here!`}</Well>
        </Panel>
      </div>
    );
  }
}

export default AppraiserLogin;
