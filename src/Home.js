import React, {Component} from 'react';
import $ from 'jquery';
import {Navbar, Nav, NavItem, Col, Thumbnail, Button, FormGroup, InputGroup, FormControl, Glyphicon, Jumbotron} from 'react-bootstrap';
import logo from './logo.svg';
import client from './res/client.png';
import appraiser from './res/appraiser.png';
import homeowner from './res/homeowner.png';
import vid1 from './res/video.mp4';
import vid2 from './res/video2.mp4';
import vid3 from './res/video3.mp4';
import aboutUs from './res/aboutUs.jpg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.pushPageChange = this.pushPageChange.bind(this);
    this.tabHandler = this.tabHandler.bind(this);
    this.state ={
      tab: 1
    }
  }
  componentWillMount(){
  }
  componentDidMount(){
    document.body.classList.add("overflow-hidden");
    $(window).on('scroll', () => {
      if ($(window).scrollTop() > 50) {
        $('nav.navbar').css("background-color","rgb(40, 50, 130)");
        $('nav.navbar').css("border-color", "rgb(40, 50, 130)");
        $('nav.navbar').css("color","white");
      } else {
        $('nav.navbar').css("background-color","	rgba(34, 34, 34, 1.0)");
        $('nav.navbar').css("border-color", "rgba(34, 34, 34, 0.6)");
      }
    })
  }
  pushPageChange(page){
    // console.log(page);
    this.props.pageChanger(page.number);
    this.props.status(page.status);
  }
  tabHandler(tabNumber){
    this.setState({
      tab: tabNumber
    })
  }
  optionChosen(optVal){
   console.log(optVal);
  }
  formHandler(e){
    e.preventDefault();
    console.log('submitting');
    var data = $('form').serialize();
    console.log(data);
    $.ajax({
      type: 'POST',
      url: 'partner.php',
      data: data
    })
    .done(function(phpDataDone){
      console.log('submitted');
      console.log(phpDataDone);
    })
    .fail(function(phpDataFail) {
      console.log('failed');
      console.log(phpDataFail);
    })
  }
  render(){
    return(
      <div>
        <Navigation tabChange={this.tabHandler}/>
        {
          this.state.tab === 1 ? <Landing vidSrc={vid1} pageChanger={this.pushPageChange}/>
        : this.state.tab === 2 ? <Login vidSrc={vid2} pageChanger={this.pushPageChange} />
      : this.state.tab === 3 ? <Contact vidSrc={vid3} chosen={this.optionChosen} form={this.formHandler}/>
        : <div>default</div>
        }
      </div>
    );
  }
}

function Navigation(props) {
  return(
    <div className="nav">
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand onClick={()=>props.tabChange(1)}>
          <img src={logo} alt="APM"/>
          Appraisers Partner Management
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        {/*
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
        */}
        <Nav pullRight>
          <NavItem eventKey={1} onClick={()=>props.tabChange(2)}>Login</NavItem>
          <NavItem eventKey={2} onClick={()=>props.tabChange(3)}>Contact Us</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

function Landing(props) {
  return (
    <div className="landing-page">
      <div className="landing">
        <video muted autoPlay loop>
          <source src={props.vidSrc} type="video/mp4" />
        </video>
      </div>
      <div className="landing-screen">
        <h1>APM</h1>
        <h2>Redefining Appraisal Management</h2>
        <div>
          <Col xs={10} md={4} className="col">
            <Thumbnail  src={client} alt="" className="thumbnail">
              <h3>Client Portal</h3>
              <p>Login as a client</p>
              <p>
                <Button bsStyle="primary">Coming Soon!</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={10} md={4} className="col">
            <Thumbnail className="thumbnail" src={homeowner} alt="homeowner">
              <h3>Homeowner Portal</h3>
              <p>Login as a homeowner</p>
              <p>
                <Button bsStyle="primary">Coming Soon!</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={10} md={4} className="col">
            <Thumbnail className="thumbnail" src={appraiser} alt="appraiser">
              <h3>Appraiser Portal</h3>
              <p>Log in as an appraiser</p>
              <p>
                <Button bsStyle="primary" onClick={()=>props.pageChanger({number:2,status:'login'})}>Log-In</Button>&nbsp;
                <Button bsStyle="default" onClick={()=>props.pageChanger({number:2,status:'signup'})}>Sign-Up</Button>
              </p>
            </Thumbnail>
          </Col>
          </div>
        </div>
        <div className="about-us">
          <Jumbotron>
            <h1>About Us</h1>
            <p>Appraisal Partners Management (APM) is a nationwide appraisal management firm,
            created with the purpose of simplifying client-vendor relationship. Working
            alongside both clients and vendors, APM is proud to implement its own cutting-edge
            application.  We are dedicated to provide the best service anywhere and everywhere.</p>
            <p>Partnering with APM means going with the leaders of the business. By working with us:
              <li>Work remotely and efficiently, through our extensive network with homeowners, banks and appraisers</li>
              <li>Expect quicker and better payouts through our approve-and-pay system</li>
              <li>Through our simple to-use platform, vendor and clients alike will be able to monitor due dates, payments and updates at all times</li>
            </p>
            <p><Button bsStyle="primary">Learn more</Button></p>
          </Jumbotron>
        </div>
    </div>
  );
}

function Login(props){
  return(
    <div>
      <div className="landing">
        <video muted autoPlay loop>
          <source src={props.vidSrc} type="video/mp4" />
        </video>
      </div>
      <div className="login-screen">
        <h1>CONNECT AS</h1>
        <Col xs={10} md={4} className="col">
          <Thumbnail  src={client} alt="" className="thumbnail">
            <h3>Client Portal</h3>
            <p>Login as a client</p>
            <p>
              <Button bsStyle="primary">Coming Soon!</Button>
            </p>
          </Thumbnail>
        </Col>
        <Col xs={10} md={4} className="col">
          <Thumbnail className="thumbnail" src={homeowner} alt="homeowner">
            <h3>Homeowner Portal</h3>
            <p>Login as a homeowner</p>
            <p>
              <Button bsStyle="primary">Coming Soon!</Button>
            </p>
          </Thumbnail>
        </Col>
        <Col xs={10} md={4} className="col">
          <Thumbnail className="thumbnail" src={appraiser} alt="appraiser">
            <h3>Appraiser</h3>
            <p>Log in as an appraiser</p>
            <p>
              <Button bsStyle="primary" onClick={()=>props.pageChanger({number:2,status:'login'})}>Log-In</Button>&nbsp;
              <Button bsStyle="default" onClick={()=>props.pageChanger({number:2,status:'signup'})}>Sign-Up</Button>
            </p>
          </Thumbnail>
        </Col>
      </div>
    </div>
  );
}

function Contact(props) {
  return(
    <div>
      <div className="landing">
        <video muted autoPlay loop>
          <source src={props.vidSrc} type="video/mp4" />
        </video>
      </div>
      <div className="partner-screen">
        <form>
          <FormGroup className="form-item">
            <InputGroup className="input-item">
              <InputGroup.Addon>First Name</InputGroup.Addon>
              <FormControl id="fname" name="fname" type="text" placeholder="Jane / John"/>
            </InputGroup>
            <InputGroup className="input-item">
              <InputGroup.Addon>Last Name</InputGroup.Addon>
              <FormControl id="lname" name="lname" type="text" placeholder="Doe"/>
            </InputGroup>
            <InputGroup className="input-item">
              <InputGroup.Addon>
                <Glyphicon glyph="glyphicon glyphicon-envelope" />
              </InputGroup.Addon>
              <FormControl id="email" name="email" type="text" placeholder="E-mail"/>
            </InputGroup>
            <InputGroup className="input-item">
              <InputGroup.Addon>
                <Glyphicon glyph="glyphicon glyphicon-phone" />
              </InputGroup.Addon>
              <FormControl id="phone" name="phone" type="tel" placeholder="Phone Number"/>
            </InputGroup>
            <InputGroup className="input-item">
              <FormControl id="message" name="message" componentClass="textarea" placeholder="Your Message Here" />
            </InputGroup>
        </FormGroup>
      </form>
      <Button type="submit" onClick={props.form}>
        Send Message
      </Button>
      </div>

    </div>
  );
}

export default Home;
