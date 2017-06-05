import React, {Component} from 'react';
import AppraiserLogin from './AppraiserLogin';
import AppraiserSignup from './AppraiserSignup';
import AppraiserPanel from './AppraiserPanel';
import * as firebase from 'firebase';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import logo from './logo.svg';

class Appraiser extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.status);
    this.state = {
      status: 'signup', //this.props.status
      toPanel: false,
      userName: null,
      data: { fname: null }
    }
    this.statusHandler = this.statusHandler.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount(){
    this.authListener = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser){
        //console.log("logged in");
        this.setState({
          toPanel: true,
          userName: firebaseUser.email
        })
      } else {
        //console.log('not logged in');
        this.setState({
          toPanel: false,
          userName: null
        })
      }
    })
  }
  statusHandler(newStatus){
    this.setState({
      status: newStatus
    })
  }
  logout(){
    firebase.auth().signOut();
    this.setState({
      status: 'login'
    })
  }
  render(){
    return(
      <div>
        <Navigation pageHandle={this.props.pageChanger} userName={this.state.userName} logout={this.logout}/>
        {
          this.state.toPanel === true ? <AppraiserPanel />
        : this.state.status === 'login'? <AppraiserLogin statusHandle={this.statusHandler} pageHandle={this.props.pageChanger}/>
        : this.state.status === 'signup' ? <AppraiserSignup statusHandle={this.statusHandler} pageHandle={this.props.pageChanger} />
        : <p>default</p>
        }
      </div>
    );
  }
}

function Navigation(props) {
  return(
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand onClick={()=>props.pageHandle(1)}>
          <img src={logo} alt="APM"/>
          Appraisers Partner Management
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          { props.userName !== null ?
          <NavDropdown eventKey={2} title={props.userName} id="basic-nav-dropdown">
            <MenuItem eventKey={2.1} onClick={props.logout}>Log Out</MenuItem>
          </NavDropdown> :
          <NavItem eventKey={1}>Not Logged In</NavItem>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Appraiser;
