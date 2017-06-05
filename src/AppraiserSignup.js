import React, {Component} from 'react';
import LicenseInformation from './LicenseInformation';
import {Button, Panel, FormGroup, InputGroup, FormControl, Checkbox, ControlLabel, Well, ListGroup, ListGroupItem, ProgressBar} from 'react-bootstrap';
import $ from 'jquery';
import * as firebase from 'firebase';

class AppraiserSignup extends Component{
  constructor(props){
    super(props);
    this.states= ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    this.softwares = ['ACI','AIReady','Alamode','Appraisal','Bradford','CRAL','DayOne','Homeputer','SFREP','United Systems','Wilson','Other'];
    this.certifications = ['Certified General','Certified Residential','Licensed','Trainee','Transitional License'];
    this.products = ['1004D Co Detector | Water Heater Double Strapped','2 SFR','2075 Desktop Underwriter Property Insp. Report','216 and 1007','5-Plex','6-Plex','AVM','Chargeback','Co-op Appraisal (FNMA 2090)','Comparable Rent Survey 1007','Completion Report - 1004d','Condition and Marketability Report (FHLMC 2070)','Condo 1073 FHA 203K','Condo-1073','Condo-1073 FHA','Condo-1073 FHA with Comparable Rent (1007)','Condo-1073 FHA with Operating Income (216)','Condo-1073 FHA-w/216 and 1007 (Investment)','Condo-1073 w/216 and 1007 (Investment)','Condo-1073 w/Comparable Rent (1007)','Condo-1073 w/Operating Income (216)','Condo-1075 Drive-by Appraisal','Desk Review','Disaster Report (Exterior Only)','Disaster Report (Int and Ext)','E.O.R.R. w/Comparable Photos (FNMA 2055)','Employee Relocation Council Report (ERC)','Estimated Value $3 MM +','Exterior Only Co-op Appraisal (FNMA 2095)','Exterior Only Residential Report (FNMA 2055)','FHA Field Review (HUD 1038)','FHA Inspection (CIR)','Field Review','Field Review (FNMA 2000)','GLA 3','500+','Homes with 10+ Acres','Inspection Fee (Cancelled after Inspection)','Land Appraisal','Manufactured Home - 1004C','Manufactured Home - 1004C w/216 and 1007 (Inv)','Manufactured Home - 1004C w/Comparable Rent (1007)','Manufactured Home - 1004C w/Operating Income (216)','Manufactured Home FHA w/203K','Manufactured Home-1004C FHA','Multi-family FHA (FNMA 1025)','Multi-Family Field Review (FNMA 2000A)','Operating Income Statement 216','Property Inspection (FNMA 2075)','Reverse Mortgage Appraisal (1004/FHA)','Rush Fee','Single Family - 1004 w/ 203k','Single Family 1004 USDA/Rural Housing Service','Single Family-1004','Single Family-1004 FHA','Single Family-1004 FHA with Comparable Rent (1007)','Single Family-1004 FHA with Operating Income (216)','Single Family-1004 FHA-w/216 and 1007 (Investment)','Single Family-1004 w/216 and 1007 (Investment)','Single Family-1004 w/Comparable Rent (1007)','Single Family-1004 w/Operating Income (216)','Single Family-2055 Drive-by Appraisal','Single Family-2055 w/216 and 1007 (Investment)','Small Residential Income Property-2 Unit','Small Residential Income Property-2 Unit-FHA','Small Residential Income Property-3 Unit','Small Residential Income Property-3 Unit-FHA','Small Residential Income Property-4 Unit','Small Residential Income Property-4 Unit-FHA','Supplement REO Addendum','Trip Fee','Trip Fee - 2nd Trip','Uniform Residentail Appraisal w/REO (FNMA 1004)','VA 1004','Value update-1004D','Commercial'];
    this.UAID = 'app_' + Math.random().toString(36).substr(2, 9);
    console.log(this.UAID);
    this.state = {
      eoi: 0,
      eoiStyle: 'info',
      w9: 0,
      w9Style: 'info',
      resume: 0,
      resumeStyle: 'info',
      sa: 0,
      saStyle: 'info',
      sa2: 0,
      saStyle2: 'info',
      ref: 0,
      refStyle: 'info',
      bc : 0,
      bcStyle: 'info',
      emailStyle: null
    }
    this.verification = this.verification.bind(this);
    this.signupHandler = this.signupHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
    this.populateUserData = this.populateUserData.bind(this);
    this.formData = {
      approved: false,
      fname: false,
      lname: false,
      cname: false,
      company: false,
      phone: false,
      phoneAlt: false,
      email: false,
      ssn: false,
      address: false,
      city: false,
      state: false,
      zip: false,
      sameasabove: false,
      mailingaddress: false,
      mailingcity: false,
      mailingstate: false,
      mailingzip: false,
      softwareChoice: false,
      details: false,
      certificationType: false,
      fha: false,
      va: false,
      com: false,
      ibn: false,
      ipn: false,
      ic: false,
      ca: false,
      pca: false,
      licensestate1: false,
      LiLN1: false,
      LiED1: false,
      licensestate2: false,
      LiLN2: false,
      LiED2: false,
      licensestate3: false,
      LiLN3: false,
      LiED3: false,
      bcdate: false,
      pricings: false,
      userFolder: {
        eoi: false,
        LiD1: false,
        LiD2: false,
        LiD3: false,
        w9: false,
        resume: false,
        sa: false,
        ref: false,
        bc: false,
      }
    }
  }
  componentWillMount(){
    document.body.classList.add("overflow-y");
  }
  componentDidMount(){
    this.authListener = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser){
        // alert("signed up and logged in");
        const uuid = firebase.auth().currentUser.uid;
        const userData = firebase.database().ref('users/'+uuid);
        userData.once('value', (snapshot) => {
          if (snapshot.val() === null) {
            console.log("no value exists... populate");
            this.populateUserData;
            userData.set(this.formData);
          }
        })
      } else {
        // console.log('not logged in');
      }
    })
    $('#sameasabove').on('click', () => {
      if($('#sameasabove').is(':checked')){
        // console.log("checked");
        document.getElementById('mailingaddress').value = document.getElementById('address').value;
        document.getElementById('mailingcity').value = document.getElementById('city').value;
        document.getElementById('mailingstate').value = document.getElementById('state').value;
        document.getElementById('mailingzip').value = document.getElementById('zip').value;
      } else {
        document.getElementById('mailingaddress').value = '';
        document.getElementById('mailingcity').value = '';
        document.getElementById('mailingstate').value = '';
        document.getElementById('mailingzip').value = '';
      }
    })
  }
  componentWillUnmount(){
    $('body').scrollTop(0);
    document.body.classList.remove("overflow-y");
  }
  populateUserData(){
    var prices = 'Prices: ';
    for (var i =0; i < this.products.length; i++) {
      var value = document.getElementById(`fee${i}`).value;
      prices += '\n-------------------------------------------------\n';
      prices += this.products[i];
      prices += `\t::\t${value}`;
    }
    const UAID = this.UAID;
    var that = this;
    firebase.storage().ref(`${UAID}/pricings.xls`).putString(prices).then(function(snapshot) {
      // console.log('Uploaded a raw string!');
      firebase.storage().ref(`${UAID}/pricings.xls`).getDownloadURL().then((url)=>{
        // console.log(url.toString());
        that.setState({
          pricings: url
        })
      });
    });

    this.formData['fname']= document.getElementById('fname').value;
    this.formData['lname']= document.getElementById('lname').value;
    this.formData['cname']= document.getElementById('cname').value;
    this.formData['company']= document.getElementById('company').value;
    this.formData['phone']= document.getElementById('phone').value;
    this.formData['phoneAlt']= document.getElementById('phoneAlt').value;
    this.formData['email']= document.getElementById('email').value;
    this.formData['ssn']= document.getElementById('ssn').value;
    this.formData['address']= document.getElementById('address').value;
    this.formData['city']= document.getElementById('city').value;
    this.formData['state']= document.getElementById('state').value;
    this.formData['zip']= document.getElementById('zip').value;
    this.formData['mailingaddress']= document.getElementById('mailingaddress').value;
    this.formData['mailingcity']= document.getElementById('mailingcity').value;
    this.formData['mailingstate']= document.getElementById('mailingstate').value;
    this.formData['mailingzip']= document.getElementById('mailingzip').value;
    this.formData['softwareChoice']= document.getElementById('softwareChoice').value;
    this.formData['details']= document.getElementById('details').value;
    this.formData['certificationType']= document.getElementById('certificationType').value;
    // SAMEASABOVE, FHA, VA, AND COM - Checkbox handling----------------------
    if ($("#sameasabove").is(':checked')) {this.formData['sameasabove'] = true;}
    else {this.formData['sameasabove'] = false;}
    if ($("#fha").is(':checked')) {this.formData['fha'] = true;}
    else {this.formData['fha'] = false;}
    if ($('#va').is(':checked')) {this.formData['va']=true;}
    else {this.formData['va'] = false;}
    if ($('#com').is(':checked')) {this.formData['com']=true;}
    else {this.formData['com'] = false;}
    // ----------------------------------------------------------
    this.formData['ibn']= document.getElementById('ibn').value;
    this.formData['ipn']= document.getElementById('ipn').value;
    this.formData['ic']= document.getElementById('ic').value;
    this.formData['ca']= document.getElementById('ca').value;
    this.formData['pca']= document.getElementById('pca').value;
    this.formData['bcdate']= document.getElementById('bcdate').value;
  }
  verification = (event : Object) => {
    // console.log(document.getElementsByClassName('well-top').text)
    const check = document.getElementById(event.target.id).value;
    const checkId = event.target.id;
    const checkIdLength = event.target.id.toString().length;
    var checkConId = '';
    var stateId = '';
    if (checkId.substring(checkIdLength-3, checkIdLength) === 'con'){
       checkConId = checkId.substring(0,checkIdLength-3);
       stateId = checkConId + 'Style';
    } else {
      checkConId = checkId + 'con';
      stateId = checkId + 'Style';
    }
    // console.log(stateId);
    const checkCon = document.getElementById(checkConId).value;
    if (check !== '' && check === checkCon){
      this.setState({
        [stateId]: 'success'
      })
    } else if (check !== '' && check !== checkCon) {
      this.setState({
        [stateId]: 'error'
      })
    } else if (check === '' && check === checkCon) {
      this.setState({
        [stateId]: null
      })
    }
  }
  signupHandler(){
    this.populateUserData();
    const uEmail = document.getElementById('loginemail').value;
    const uPass = document.getElementById('loginpassword').value;
    const uEmailCon = document.getElementById('loginemailcon').value;
    const uPassCon = document.getElementById('loginpasswordcon').value;
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const cname = document.getElementById('cname').value;
    const company = document.getElementById('company').value;
    const phone = document.getElementById('phone').value;
    const phoneAlt = document.getElementById('phoneAlt').value;
    const email = document.getElementById('email').value;
    const ssn = document.getElementById('ssn').value;
    if ( uEmail === ''
      || uPass === ''
      || uEmailCon === ''
      || uPassCon === ''
      || fname === ''
      || lname === ''
      || cname === ''
      || company === ''
      || phone === ''
      || phoneAlt === ''
      || email === ''
      || ssn === '' ){
        $(window).scrollTop(0);
        alert("Looks like you're missing something. Please check the required fields.")
         return;
       }
    this.populateUserData();
    if (uEmail !== "" && uPass !== ""){
      if (uEmail === uEmailCon && uPass === uPassCon){
        firebase.auth().createUserWithEmailAndPassword(uEmail, uPass);
      } else {

      }
    } else {
      // console.log("nothing happened");
    }
  }
  /*---------------------------------UPLOAD HANDLER----------------------------------------*/
  uploadHandler = (event : Object) => {                                                /**/
    const file = event.target.files[0];                                                /**/
    const storageRef = firebase.storage().ref();                                       /**/
    const location = this.UAID;                     /**/
    const profileRef = storageRef.child(location.toString());
    const profile = profileRef.child(event.target.id);
    // console.log(event.target.id);
    const metadata = {
      name: 'userFile'
    }
    event.persist();
    profile.put(file, metadata).on('state_changed', (snapshot:Object) =>{
      const progress = Math.round(100 * snapshot.bytesTransferred / snapshot.totalBytes);
      // const tracker = event.target.id + "Doc";
      // console.log(tracker);
      this.setState({
        [event.target.id]: progress
      })
      // console.log(progress);
    }, () => {
      alert("There was an error uploading your file, please try again.");
    }, (file)=>{
      // console.log("Completed");
      this.setState({
        [`${event.target.id}Style`] : 'success',
        [`${event.target.id}`] : "Successfully Uploaded"
      })
      profile.getDownloadURL().then((url) => {
        // console.log(url);
        this.formData['userFolder'][event.target.id] = url;
      })
    })
    //task.on('state_changed',this.onProgress,this.onError,this.onComplete.bind(this, file));
  }
  /*-----------------------------------------------------------------------------------*/
  render(){
    return(
      <div className="signup-screen">
      <Well bsStyle="danger" className="well-top">
        Sections marked in red are required. <p></p> Fill out the application as accurately as possible.
      </Well>
        <form>
          <Panel header="Login Information" bsStyle="danger">
            <FormGroup validationState={this.state.loginemailStyle} onChange={this.verification}>
              <InputGroup className="signup-item" >
                <FormControl type="email" id="loginemail" name="loginemail" placeholder="E-mail" />
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl type="email" id="loginemailcon" name="loginemailcon" placeholder="Confirm E-mail" />
              </InputGroup>
              </FormGroup>
              <FormGroup validationState={this.state.loginpasswordStyle} onChange={this.verification}>
              <InputGroup className="signup-item">
                <FormControl type="password" id="loginpassword" name="loginpassword" placeholder="Password"/>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl type="password" id="loginpasswordcon" name="loginpasswordcon" placeholder="Confirm Password"/>
              </InputGroup>
            </FormGroup>
          </Panel>
          <Panel bsStyle="danger" header="Personal Details">
              <FormGroup>
                <InputGroup className="signup-item">
                  <FormControl type="text" id="fname" name="fname" placeholder="First Name"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="text" id="lname" name="lname" placeholder="Last Name"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="text" id="cname" name="cname" placeholder="Name On Check"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="text" id="company" name="company" placeholder="Company Name"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="tel" id="phone" name="phone" placeholder="Phone"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="tel" id="phoneAlt" name="phoneAlt" placeholder="Alternate Phone"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="email" id="email" name="email" placeholder="E-mail"/>
                </InputGroup>
                <InputGroup className="signup-item">
                  <FormControl type="num" id="ssn" name="ssn" placeholder="EIN/SSN"/>
                </InputGroup>
              </FormGroup>
          </Panel>
          <Panel bsStyle="danger" header="Physical Address">
            <FormGroup>
              <InputGroup className="signup-item">
                <FormControl type="text" id="address" name="address" placeholder="Address"/>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl type="text" id="city" name="city" placeholder="City"/>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl componentClass="select" id="state" name="state" placeholder="State">
                  <option value="select">State</option>
                  {this.states.map((item,i) => <option key={i} value={item.toString().toLowerCase()}>{item}</option>)}
                </FormControl>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl type="text" id="zip" name="zip" placeholder="Zip"/>
              </InputGroup>
            </FormGroup>
          </Panel>
          <Panel header="Mailing Address">
            <FormGroup>
            <Checkbox id="sameasabove" name="sameasabove" inline>
              Same as Physical Address
            </Checkbox>
              <InputGroup className="signup-item">
                <FormControl type="text" id="mailingaddress" name="mailingaddress" placeholder="Address"/>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl type="text" id="mailingcity" name="mailingcity" placeholder="City"/>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl componentClass="select" id="mailingstate" name="mailingstate" placeholder="State">
                  <option value="select">State</option>
                  {this.states.map((item,i) => <option key={i} value={item.toString().toLowerCase()}>{item}</option>)}
                </FormControl>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl type="text" id="mailingzip" name="mailingzip" placeholder="Zip"/>
              </InputGroup>
            </FormGroup>
          </Panel>
          <Panel header="Other Information">
            <FormGroup>
              <InputGroup className="signup-item">
                <FormControl componentClass="select" id="softwareChoice" name="softwareChoice" placeholder="State">
                  <option value="select">Appraisal Software</option>
                  {this.softwares.map((item,i) => <option key={i} value={item.toString().toLowerCase()}>{item}</option>)}
                </FormControl>
              </InputGroup>
              <InputGroup className="signup-item">
                <FormControl componentClass="textarea" id="details" name="details" placeholder="Other Details"/>
              </InputGroup>
            </FormGroup>
          </Panel>
          <Panel header="Certification Information">
            <FormGroup>
              <InputGroup className="signup-item">
                <FormControl componentClass="select" id="certificationType" name="certificationType" placeholder="State">
                  <option value="select">Certification Type</option>
                  {this.certifications.map((item,i) => <option key={i} value={item.toString().toLowerCase()}>{item}</option>)}
                </FormControl>
              </InputGroup>
              <InputGroup className="signup-item">
                <Checkbox id="fha" name="fha" inline>
                  FHA Certified
                </Checkbox>
                <Checkbox id="va" name="va" inline>
                  VA Certified
                </Checkbox>
                <Checkbox id="com" name="com" inline>
                  Commercial
                </Checkbox>
              </InputGroup>
            </FormGroup>
          </Panel>
          <EOInsurance uploadHandle={this.uploadHandler} currProgress={this.state.eoi} />
          <LicenseInformation uaid={this.UAID}/>
          <Panel header="Supporting Documents" >
            <FormGroup>
              <Well>
                <InputGroup className="signup-item">
                  <ControlLabel>W-9 Document</ControlLabel>
                  <ProgressBar label={this.state.w9} now={this.state.w9} max={100} id="w9Doc" bsStyle={this.state.w9Style}/>
                  <FormControl type="file" id="w9" name="w9" onChange={this.uploadHandler}/>
                </InputGroup>
              </Well>
              <Well>
                <InputGroup className="signup-item">
                  <ControlLabel>Resume</ControlLabel>
                  <ProgressBar label={this.state.resume} now={this.state.resume} max={100} id="resumeDoc" bsStyle={this.state.resumeStyle}/>
                  <FormControl type="file" id="resume" name="resume" onChange={this.uploadHandler}/>
                </InputGroup>
              </Well>
              <Well>
                <InputGroup className="signup-item">
                {/* 1004, 1025
                  */}
                  <ControlLabel>Sample Appraisal 1</ControlLabel>
                  <ProgressBar label={this.state.sa} now={this.state.sa} max={100} id="saDoc" bsStyle={this.state.saStyle}/>
                  <FormControl type="file" id="sa" name="sa" onChange={this.uploadHandler}/>
                </InputGroup>
              </Well>
              <Well>
                <InputGroup className="signup-item">
                  <ControlLabel>Sample Appraisal 2</ControlLabel>
                  <ProgressBar label={this.state.sa2} now={this.state.sa2} max={100} id="sa2Doc" bsStyle={this.state.saStyle}/>
                  <FormControl type="file" id="sa2" name="sa2" onChange={this.uploadHandler}/>
                </InputGroup>
              </Well>
              <Well>
                <InputGroup className="signup-item">
                  <ControlLabel>References</ControlLabel>
                  <ProgressBar label={this.state.ref} now={this.state.ref} max={100} id="refDoc" bsStyle={this.state.refStyle}/>
                  <FormControl type="file" id="ref" name="ref" onChange={this.uploadHandler}/>
                </InputGroup>
              </Well>
              <Well>
                <InputGroup className="signup-item">
                  <ControlLabel>Background Check</ControlLabel>
                  <ProgressBar label={this.state.bc} now={this.state.bc} max={100} id="bcDoc" bsStyle={this.state.bcStyle}/>
                  <FormControl type="file" id="bc" name="bc" onChange={this.uploadHandler}/>
                </InputGroup>
                <InputGroup>
                  <ControlLabel>Issue Date</ControlLabel>
                  <FormControl type="date" id="bcdate" name="bcdate" placeholder="Issue Date"/>
                </InputGroup>
              </Well>
            </FormGroup>
          </Panel>
          <Panel header="Product Fees">
              <FormGroup className="products-panel-form">
                <ListGroup fill>
                  {this.products.map((item,i) => <ProductListItem key={i} idNum={i} productName={item} /> )}
                </ListGroup>
              </FormGroup>
          </Panel>
          <Panel header="APM-Appraiser Agreement"  bsStyle="warning">
            Our terms and conditions go here....
          </Panel>
        </form>
        <Well bsStyle="warning">By clicking the 'Sign-Up' button you agree to the terms and conditions mentioned above
          <Button bsStyle="primary" type="submit" className="signup-button" onClick={this.signupHandler}>
            Sign-Up
          </Button>
        </Well>
      </div>
    );
  }
}

function ProductListItem(props){
  return(
    <ListGroupItem>
      <ControlLabel className="product-label">{props.productName}</ControlLabel>
      <InputGroup className="signup-item">
          <InputGroup.Addon>$</InputGroup.Addon>
        <FormControl type="number" id={`fee${props.idNum}`} name={`fee${props.idNum}`} placeholder="Fee"/>
      </InputGroup>
    </ListGroupItem>
  );
}

function EOInsurance(props) {
  return (
    <Panel header="E&O Insurance">
      <FormGroup>
        <InputGroup className="signup-item">
          <FormControl type="text" id="ibn" name="ibn" placeholder="Insurance Beneficiary Name"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <FormControl type="text" id="ipn" name="ipn" placeholder="Insurance Policy Number"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <FormControl type="text" id="ic" name="ic" placeholder="Insurance Company"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <FormControl type="text" id="ca" name="ca" placeholder="Coverage Amount"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <FormControl type="text" id="pca" name="pca" placeholder="Per Incident Coverage Amount"/>
        </InputGroup>
        <InputGroup className="signup-item">
          <ControlLabel>E&O Insurance</ControlLabel>
          <ProgressBar label={`${props.currProgress}`} now={props.currProgress} max={100} id="eoiDoc" bsStyle="success"/>
          <FormControl type="file" id="eoi" name="eoi" onChange={props.uploadHandle}/>
        </InputGroup>
      </FormGroup>
    </Panel>
  );
}

export default AppraiserSignup;
